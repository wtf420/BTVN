import 'package:flutter/material.dart';

void main() {
  runApp(AppbarDemoApp());
}

class AppbarDemoApp extends StatelessWidget {

  final String title = "Appbar demo";
  final List<String> months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "November",
    "December",
  ];

  AppbarDemoApp({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: this.title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(this.title),
          actions: <Widget>[
            IconButton(
              icon: Icon(Icons.bookmark),
              onPressed: null,
            ),
            IconButton(
              icon: Icon(Icons.delete),
              onPressed: null,
            ),
          ],
        ),
        body: ListView.custom(
          childrenDelegate: SliverChildBuilderDelegate((ctx, i) {
            return ListTile(
              leading: Icon(Icons.check_circle),
              title: Text(months[i]),
            );
          }, childCount: months.length),
        )
      )
    );
  }
}