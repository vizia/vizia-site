---
order: 4
---

# Layout

The position and size of a view is determined by its layout properties. Vizia uses a custom layout system called [morphorm](https://github.com/vizia/morphorm).

## Layout Type

By default, children of a view will be arranged one after another in a vertical stack. The `layout-type` property can be used to choose between a vertical `Column` stack, a horizontal `Row` stack, or a [`Grid`](grid.md).

```rust
// The `HStack` container will arrange its children in a row.
// However, the layout type of the `HStack` can be overridden
// with the `layout_type` modifier.
HStack::new(cx, |cx|{
    Label::new(cx, "Hello");
    Label::new(cx, "World");
})
.layout_type(LayoutType::Column);
```

## Position Type

The `position-type` property can be used on a child to specify whether the child should be `ParentDirected`, i.e. positioned by its parent to come after the previous child, or `SelfDirected`, i.e. ignore the position of its siblings and be positioned relative to the top left corner of the parent.

```rust
VStack::new(cx, |cx|{
    Label::new(cx, "Hello");
    Label::new(cx, "World")
        .position_type(PositionType::SelfDirected);
});
```

# Size

The size of a view is controlled by the `width` and `height` properties, and can be specified using `Units`, which can be pixels, a percentage, a stretch factor, or auto.

The `width` and `height` of a view can be specified using the respective layout modifiers which use the `Units` type:

```rust
use vizia::prelude::*;

Application::new(|cx|{
    Label::new(cx, "Hello World")
        .background_color(Color::gray())
        .width(Pixels(200.0))
        .height(Pixels(30.0));
})
.inner_size((400, 100))
.run();
```

The width and height can be set simultaneously with the `size` layout modifier:

```rust
use vizia::prelude::*;

Application::new(|cx|{
    Label::new(cx, "Hello World")
        .background_color(Color::gray())
        .size(Pixels(50.0));
})
.inner_size((400, 100))
.run();
```

Or we can use CSS to specify the width and height:

```rust
use vizia::prelude::*;

const STYLE: &str = r#"
    .hello_label {
        width: 20px;
        height: 1s;
    }
"#;

Application::new(|cx|{

    cx.add_theme(STYLE);

    Label::new(cx, "Hello World")
        .background_color(Color::gray())
        .class("hello_label");
})
.inner_size((400, 100))
.run();
```

> Note that inline layout modifiers will override CSS properties.

## Stretch Size

The width and height of a view can also be specified with a stretch factor:

```rust
use vizia::prelude::*;

Application::new(|cx|{
    HStack::new(cx, |cx|{
        Label::new(cx, "Hello")
            .background_color(Color::gray())
            .width(Stretch(1.0));

        Label::new(cx, "World")
            .width(Stretch(2.0));
    });
})
.inner_size((400, 100))
.run();
```

In the above example, the first label occupies 1/3 of the horizontal space and the second occupies 2/3 of the free space.

The free space is the size of the parent in the main axis (width for row, height for column) minus any fixed space/size.

## Auto Size

The width and height of a view can be specified as `auto`, which results in the view 'hugging' its children in specified axis:

```rust
Application::new(|cx|{
    HStack::new(cx, |cx|{
        Label::new(cx, "Hello");
        Label::new(cx, "World");
    })
    .background_color(Color::gray)
    .height(Auto);
})
.inner_size((400, 100))
.run();
```

In the above example, the height of the `HStack` is specified as `Auto`, which causes the computed height to become the maximum of its child heights.

If we had specified the hstack width to be `Auto`, then the computed width would be the sum of the widths of its children.

# Space

The spacing of an element determines its position relative to its normal stack position if parent-directed, or relative to the top left of its parent if self directed.

The space is specified with [`Units`](units.md) and is conceptually similar to margins.

The spacing can be specified for individual sides using the `left`, `right`, `top`, and `bottom` properties. For example:

```rust
Element::new(cx).left(Pixels(50.0));
```

Additionally, spacing can be applied to all sides simultaneously using the `space` property:

```rust
Element::new(cx).space(Pixels(50.0));
```

# Child Space

While the space affects individual elements within a stack or grid, the child-space is a property on the parent which affects all of the children of an element, as long as the corresponding individual space of the child is set to `Auto` units.

For example, setting the `child-left` property of a `VStack` will add space to the left side of each of its children (as long as those children have a `left` property set to `auto`, which it is by default). However, setting the `child-top` of a `VStack` will only apply to the top side of the first element in the column.

We can use the `child-space` property to center the children of a container by using the `Stretch` unit variant:

```rust
VStack::new(cx, |cx|{
    Label::new(cx, "Hello");
    LAbel::new(cx, "World");
})
.child_space(Stretch(1.0));
```

There are two additional properties for affecting the space between elements in a stack. The `row-between` property affects the vertical space between elements stacked vertically in rows (e.g. a `VStack`), and the `col-between` property affects the horizontal space between elements stacked horizontally in columns (e.g. a `HStack`).

# Stacks Reference

An overview of the layout system for working with stacks, in which child elements are positioned one after another.

1. For stacking, a parent element can arrange its children into a vertical stack (`layout-type: column`) or a horizontal stack (`layout-type: row`).

2. A child element is positioned relative to its stack position (`position-type: parent-directed`), or relative to the top-left of its parent (`position-type: self-directed`).

3. A child element can be positioned by adding space to the `left`, `right`, `top`, or `bottom` of an element.

4. Spacing can be expressed in pixels, percentage, stretch, or auto (see 8). Stretch causes the spacing to be flexible, occupying a proportion of the remaining free space. By default, spacing is set to auto.

5. The size of an element is determined by its `width` and `height`, which can also be expressed in pixels, percentage, stretch and auto. By default, size is set to stretch.

6. When size is set to auto, an element will 'hug' its children in that axis. This is also true for `min-width`/`min-height` (see 10).

7. A parent can add space around its stacked children with `child-space`, or specified individually with `child-left`, `child-right`, `child-top`, `child-bottom`, or add space between its child elements with `child-between`.

8. Child spacing applies to elements with spacing set to auto.

9. Spacing set in pixels, percentage, or stretch overrides child spacing.

10. All spacing and size properties have corresponding minimum and maximum constraint properties. For example, for `left` there is `min-left` and `max-left`. By default spacing and size minimums and maximums are set to auto. This will cause elements to `hug` their children if the size if flexible and goes below the minimum.
