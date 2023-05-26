import 'package:bai3/userInfo.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(FirstApp());
}

class FirstApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Simple App',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  final List<Name> products = [
    Name(
      name: 'Name 1',
      description: 'Description 1',
      comments: [
        Comment(user: 'User 1', text: 'Comment 1 for Name 1'),
        Comment(user: 'User 2', text: 'Comment 2 for Name 1'),
      ],
    ),
    Name(
      name: 'Name 2',
      description: 'Description 2',
      comments: [
        Comment(user: 'User 1', text: 'Comment 1 for Name 2'),
        Comment(user: 'User 2', text: 'Comment 2 for Name 2'),
        Comment(user: 'User 3', text: 'Comment 3 for Name 2'),
      ],
    ),
    Name(
      name: 'Name 3',
      description: 'Description 3',
      comments: [
        Comment(user: 'User 1', text: 'Comment 1 for Name 3'),
      ],
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Simple App'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: TextField(
              decoration: InputDecoration(
                hintText: 'Search',
                prefixIcon: Icon(Icons.search),
              ),
            ),
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Container(
                width: 200,
                height: 200,
                decoration: BoxDecoration(
                  border: Border.all(width: 1)
                ),
              ),
              Container(
                width: 200,
                height: 200,
                decoration: BoxDecoration(
                  border: Border.all(width: 1)
                ),
              ),
              Container(
                width: 200,
                height: 200,
                decoration: BoxDecoration(
                  border: Border.all(width: 1)
                ),
              ),
            ],
          ),
          Expanded(
            child: ListView.builder(
              itemCount: products.length,
              itemBuilder: (context, index) {
                return ProductCard(name: products[index]);
              },
            ),
          ),
        ],
      ),
    );
  }
}

class Name {
  final String name;
  final String description;
  final List<Comment> comments;

  Name({
    required this.name,
    required this.description,
    required this.comments,
  });
}

class Comment {
  final String user;
  final String text;

  Comment({
    required this.user,
    required this.text,
  });
}

class ProductCard extends StatefulWidget {
  final Name name;

  const ProductCard({required this.name});

  @override
  _ProductCardState createState() => _ProductCardState();
}

class _ProductCardState extends State<ProductCard> {
  bool showComments = false;

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12.0),
      ),
      margin: EdgeInsets.all(8.0),
      child: Padding(
        padding: EdgeInsets.all(8.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                CircleAvatar(
                  radius: 16,
                  child: ElevatedButton(
                    onPressed: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => userinfo()),
                      );
                    },
                    style: ElevatedButton.styleFrom(
                      backgroundColor: Colors.transparent,
                      shadowColor: Colors.transparent,       
                    ),
                    child: Align(
                      alignment: Alignment.center,
                      child: Text(
                        widget.name.name.substring(0, 1),
                        style: TextStyle(fontSize: 14),
                      ),
                    ),
                  ),
                ),
                SizedBox(width: 8.0),
                Text(
                  widget.name.name,
                  style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                ),
              ],
            ),
            SizedBox(height: 8.0),
            Text(
              widget.name.description,
              style: TextStyle(
                fontSize: 16,
                color: Colors.grey[700],
              ),
            ),
            SizedBox(height: 8.0),
            Text(
              'Comments:',
              style: TextStyle(fontWeight: FontWeight.bold),
            ),
            SizedBox(height: 8.0),
            GestureDetector(
              onTap: () {
                setState(() {
                  showComments = !showComments;
                });
              },
              child: Container(
                padding: EdgeInsets.symmetric(vertical: 8.0),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey),
                  borderRadius: BorderRadius.circular(8.0),
                ),
                child: Column(
                  children: [
                    ListTile(
                      title: Text(
                        'View Comments',
                        style: TextStyle(fontSize: 14, color: Colors.blue),
                      ),
                      trailing: Icon(
                        showComments
                            ? Icons.keyboard_arrow_up
                            : Icons.keyboard_arrow_down,
                      ),
                    ),
                    if (showComments)
                      Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: widget.name.comments.map((comment) {
                          return ListTile(
                            leading: CircleAvatar(
                              radius: 12,
                              child: Text(
                                comment.user.substring(0, 1),
                                style: TextStyle(fontSize: 12),
                              ),
                            ),
                            title: Text(comment.user),
                            subtitle: Text(
                              comment.text,
                              style: TextStyle(fontSize: 14),
                            ),
                          );
                        }).toList(),
                      ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}