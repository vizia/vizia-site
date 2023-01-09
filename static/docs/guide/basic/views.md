---
order: 2
---

# Views

Views are used to visually present [model data](/guide/basic/models) and to act as controls which, when interacted with, send events to mutate model data. They are the building blocks of a GUI.

For example, the `Label` view is used to display a text string:

```rust
use vizia::prelude::*;

fn main() {
    Application::new(|cx|{
        Label::new(cx, "Hello World");
    })
    .inner_size((400, 200))
    .run();
}
```

![A window with its size set to 400 by 200 with a label displaying 'Hello World'" width="400](/docs_img/hello_world.png)

The first argument to the constructor of the label is a mutable reference to `Context`, shortened to `cx`. This allows the view to build itself into the application and is ubiquitous to all views.

# Modifiers

Modifiers are used to change the properties of a view in a declarative way. There are 6 types of modifiers:

- [View Modifiers](#view-modifiers)
- [Style Modifiers](#style-modifiers)
- [Layout Modifiers](#layout-modifiers)
- [Text Modifiers](#text-modifiers)
- [Action Modifiers](#action-modifiers)
- [Accessibility Modifiers](#accessibility-modifiers)

## View Modifiers

Some views have modifiers which are specific to themselves and are only available for that view type. For example, the `Slider` view has a modifier for setting the slider `range`.

```rust
use vizia::prelude::*;

#[derive(Lens)]
pub struct AppData {
    value: 20.0,
}

fn main() {
    Application::new(|cx|{
        Slider::new(cx, AppData::value)
            .range(0.0100.0);
    })
    .inner_size((400, 100))
    .run();
}
```

> In the above example a `Slider` view needs a value from a model to bind to. This will be covered in the [binding](/guide/basic/binding) section of this guide.

The modifier types in the following subsections are applicable to all views.

## Style Modifiers

Style modifiers are used to set visual properties of a view which do _not_ affect layout or text. For example, we can set the background color of a view with the `background_color` style modifier:

```rust
use vizia::prelude::*;

fn main() {
    Application::new(|cx|{
        Label::new(cx, "Hello World")
            .background_color(Color::rgb(200, 200, 200));
    })
    .inner_size((400, 100))
    .run();
}
```

<!-- ![" width="400](/docs_img/label_background_color.png) -->

## Layout Modifiers

Layout modifiers are used to set properties which affect the position and size of the view. For example, we can specify the width of a view using the `width` layout modifier:

```rust
use vizia::prelude::*;

fn main() {
    Application::new(|cx|{
        Label::new(cx, "Hello World")
            .background_color(Color::rgb(200, 200, 200))
            .width(Pixels(150.0));
    })
    .inner_size((400, 100))
    .run();
}
```

## Text Modifiers

As the name suggests, text modifiers are used to set properties relating to the text content of a view. For example, we can set the font size with the `font_size` text modifier:

```rust
use vizia::prelude::*;

fn main() {
    Application::new(|cx|{
        Label::new(cx, "Hello World")
            .font_size(32.0);
    })
    .inner_size((400, 100))
    .run();
}
```

## Action Modifiers

Action modifiers are used to add a actions to a views which don't have a callback for a particular window event. For example, we can use the `on_press` action modifier to emit an event when a `Label` is pressed, even though a label does not have this built-in capability:

```rust
use vizia::prelude::*;

fn main() {
    Application::new(|cx|{
        Label::new(cx, "Hello World")
            .on_press(|_| println!("Label was pressed!"));
    })
    .inner_size((400, 100))
    .run();
}
```

> Note that, for accessibility, adding an `on_press` action modifier to a view will give the view a `Button` role unless overridden with the `role` accessibility modifier.

## Accessibility Modifiers

> WARNING: Not yet implemented, but coming soon!

Accessibility modifiers are used to set properties of a view which assistive technologies, such as screen readers, can use to make the views accessible. For example, we can add a name to a view with the `name` modifier, which will be read by a screen reader when the view is focused:

```rust
use vizia::prelude::*;

#[derive(Lens)]
pub struct AppData {
    value: 20.0,
}

fn main() {
    Application::new(|cx|{
        Slider::new(cx, AppData::value)
            .range(0.0100.0)
            .name("custom name");
    })
    .inner_size((400, 100))
    .run();
}
```

> Some views, such as a `Label` or a `Button`, should **not** be given a name as it is derived automatically from their text content.

## Property Binding

Although we haven't introduced the concepts of [models](/guide/basic/models), [lenses](/guide/basic/binding#lenses), and [binding](/guide/basic/binding) yet, for completeness it's worth mentioning that many modifiers also accept a lens as well as a value. When a lens is supplied to a modifier, a binding is set up which will update the modifier property when the bound to model data changes.

```rust
use vizia::prelude::*;

#[derive(Lens)]
pub struct AppData {
    color: Color,
}

pub enum AppEvent {
    SetColorBlue,
}

impl Model for AppData {
    fn event(&mut self, cx: &mut EventContext, event: &mut Event) {
        event.map(|app_event, _| match app_event {
            AppEvent::SetColorBlue => {
                self.color = Color::blue();
            }
        });
    }
}

fn main() {
    Application::new(|cx|{
        AppData {color: Color::red() }.build(cx);

        Label::new(cx, "Hello World")
            .background_color(AppData::color);

        Button::new(cx, |cx| cx.emit(AppEvent::SetColorBlue),
            |cx| Label::new(cx, "Set to Blue"));
    })
    .inner_size((400, 100))
    .run();
}
```

# Composing Views

Composition of views is achieved through container views which, as the name suggests, contain other views. Some container views may arrange their content in a particular way.

For example, the `VStack` container view will arrange its contents into a vertical column:

```rust
use vizia::prelude::*;

fn main() {
    Application::new(|cx|{

        VStack::new(cx, |cx|{
            Label::new(cx, "Hello");
            Label::new(cx, "World");
        });
    })
    .inner_size((400, 100))
    .run();
}
```

![" width="400](/docs_img/vstack.png)

While a `HStack` container will arrange its contents into a horizontal row:

```rust
use vizia::prelude::*;

fn main() {
    Application::new(|cx|{

        HStack::new(cx, |cx|{
            Label::new(cx, "Hello");
            Label::new(cx, "World");

        });
    })
    .inner_size((400, 100))
    .run();
}
```

![" width="400](/docs_img/hstack.png)

# The View Tree

Composing views together forms a tree, where each view has a single parent and zero or more children.

```rust
use vizia::prelude::*;

Application::new(|cx|{
    HStack::new(cx, |cx|{
        Label::new(cx, "Hello");
        Label::new(cx, "World");
    });
})
.run();
```

For example, for the code above the view tree can be depicted with the following diagram:

![Diagram of a basic view tree depicting a Window view with a child HStack view with two child Label views." width="320](/docs_img/basic_tree.svg)

The `Window` is the _parent_ of the `HStack`, while the `HStack` is the _parent_ of both the `Label`s. Therefore, the `Window` is an _ancestor_ of the `Label`s. This terminology is important for [selector](/guide/basic/styling#stylesheets) matching during styling.

The view tree is iterated by Vizia in order to perform styling, layout, and rendering (amongst other things). Therefore, it can be useful to visualize the view tree when specifying style and layout properties to determine how they will affect ancestor and descendant views.
