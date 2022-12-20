# What is Vizia?

Lorem ipsum dolor sit amet consectetur. Morbi nulla at in cursus ipsum sed enim urna faucibus. Quam vitae risus tortor at in praesent vel in urna. Diam turpis quam libero diam laoreet ultricies. Pellentesque duis cras commodo vitae bibendum sed nulla ullamcorper risus.

Rutrum hendrerit in potenti ipsum turpis orci sit. Faucibus eros habitasse facilisis viverra et. Sit volutpat neque erat lectus porttitor nisl magna vitae. Nam blandit vulputate nunc commodo accumsan in elementum tincidunt habitant. Feugiat commodo nisl faucibus ipsum. Quis pellentesque a adipiscing quam facilisi molestie suspendisse nec velit. Tincidunt ut gravida velit urna molestie id at vel. Nulla amet sed nibh blandit velit quam nullam.

Here is a minimal example:

```rust
pub struct MyView;

impl MyView {
    pub fn new(cx: &mut Context) -> Handle<MyView> {
        MyView {}.build(cx, |cx| {
            Button::new(cx, |_| println!(“Hello from MyView!”),
                |cx| Label::new(cx, “Press Me!”));
        });
    }
}

impl View for MyView {}
```

Lorem ipsum dolor sit amet consectetur. Morbi nulla at in cursus ipsum sed enim urna faucibus. Quam vitae risus tortor at in praesent vel in urna. Diam turpis quam libero diam laoreet ultricies. Pellentesque duis cras commodo vitae bibendum sed nulla ullamcorper risus.

Rutrum hendrerit in potenti ipsum turpis orci sit. Faucibus eros habitasse facilisis viverra et. Sit volutpat neque erat lectus porttitor nisl magna vitae. Nam blandit vulputate nunc commodo accumsan in elementum tincidunt habitant. Feugiat commodo nisl faucibus ipsum. Quis pellentesque a adipiscing quam facilisi molestie suspendisse nec velit. Tincidunt ut gravida velit urna molestie id at vel. Nulla amet sed nibh blandit velit quam nullam.

Lorem ipsum dolor sit amet consectetur. Morbi nulla at in cursus ipsum sed enim urna faucibus. Quam vitae risus tortor at in praesent vel in urna. Diam turpis quam libero diam laoreet ultricies. Pellentesque duis cras commodo vitae bibendum sed nulla ullamcorper risus.

Rutrum hendrerit in potenti ipsum turpis orci sit. Faucibus eros habitasse facilisis viverra et. Sit volutpat neque erat lectus porttitor nisl magna vitae. Nam blandit vulputate nunc commodo accumsan in elementum tincidunt habitant. Feugiat commodo nisl faucibus ipsum. Quis pellentesque a adipiscing quam facilisi molestie suspendisse nec velit. Tincidunt ut gravida velit urna molestie id at vel. Nulla amet sed nibh blandit velit quam nullam.
