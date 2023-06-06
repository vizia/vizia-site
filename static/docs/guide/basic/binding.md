# Data Binding

Data binding is the concept of linking model data to views, so that when the model data is changed, the views observing this data update in response.

<!-- Therefore, it is data binding which provides the mechanism for reactivity in Vizia. -->

In Vizia, data binding is achieved through the use of lenses. A lens is an object which allows you to _select_ some part of a model and inspect its value. These lens objects are then used to form a binding between views and these parts of the model, updating when only these specific parts have changed.

The `Lens` derive macro can be used to generate a lens for each field of a struct. These lenses can then be used to transform a reference to the struct into a reference to each of its fields. The generated lenses are given the same name as the field and placed in a module with the same name as the struct. For example, given the following definition of some model data:

```rust
use vizia::prelude::*;

#[derive(Lens)]
pub struct AppData {
    name: String,
}

impl Model for AppData {}

fn main() {
    Application::new(|cx|{

    }).run();
}
```

A lens to the `name` field is generated as `AppData::name`. We can then use this lens with the `Label` view to set up a binding between the label and the name field.

```rust
use vizia::prelude::*;

#[derive(Lens)]
pub struct AppData {
    name: String,
}

impl Model for AppData {}

fn main() {
    Application::new(|cx|{
        Label::new(cx, AppData::name);
    }).run();
}
```

The `Label` view accepts a lens to any type which implements the `ToString` trait.

// end here

A lens is a type which implements the `Lens` trait, which has a `Source` associated type, a `Target` associated type, and a `view` method. There are a few different types of lenses, but the simplest type transforms a reference to the `Source` into a reference to the `Target`.

Let's see how this is used to bind a `Label` view to a string property in the model data.

Ths trait has a function which returns some data derived from the

This trait describes how to extract a reference to some part of the model data. For example, given a reference to the model data, a lens could

This trait defines a `Source` type and a `Target` type, and a `view` function which, given a reference to the source, returns some output .

## View Binding

Some views accept a [lens](#lenses), as well as a value, as an input. When provided a lens, the view sets up a binding to the data.

For example, the `Label` view accepts a lens to any type which implements `ToString`:

```rust
#[derive(Lens)]
pub struct Person {
    pub name: String,
}

impl Model for Person {}

Application::new(|cx|{
    Label::new(cx, Person::name);
})
.run()
```

Note the `Lens` derive, which allows us to bind to a field of the model data. When the `name` field changes, the text of the label updates to show the new value.

## The `Binding` View

There is a special container view in Vizia called the `Binding` view. This view binds to some data and will remove and then rebuild its contents if the data changes.

The following code produces the same result as passing the lens directly to the label, however, the binding view will rebuild the label when the name changes, which is unnecessary. The binding view is useful for [constructing views conditionally](#conditional-views).

```rust
pub struct Person {
    pub name: String,
}

impl Model for Person {}

Application::new(|cx|{
    Binding::new(cx, Person::name, |cx, name|{
        Label::new(cx, &name.get(cx));
    });
})
.run()
```

# Lenses

Vizia uses lenses to allow specifying a binding to a piece of model data:

```rust
#[derive(Lens)]
pub struct Person {
    pub name: String,
}

impl Model for Person {}
```

The `Lens` derive macro generates a type for each of the fields of the struct.

Then, a static instance of each type is created with the same name as the field, within a module with the same name as the struct.

For example, for the above model, a lens to the `name` field is created as `Person::name`.

Each generated type implements the `Lens` trait, which looks something like this:

```rust
pub trait Lens {
    type Source;
    type Target;

    fn view(&self, &Self::Source) -> &Self::Target;
}
```

> NOTE - The above code is a simplification.

The view method of the lens takes a reference to a `Source` type and produces a reference to a `Target` type. For the `Person::name` lens, the source is `Person` and the target is `String`. The view method, given a reference to `Person`, returns a reference to the `name`.

# Lens Map

The `map()` method on a lens can be used to derive data from the target of the lens. This is useful for when the lens target is not the right type for the binding, but a value of the correct type can be derived from it.

For example, let's say we have some string data representing a name in our model, but we only want to display the first letter within a label:

```rust
use vizia::prelude::*;

#[derive(Lens)]
pub struct AppData {
    pub name: String,
}

impl Model for AppData {}

fn main() {
    Application::new(|cx|{

        AppData {
            name: String::from("John Doe"),
        }.build(cx);

        Label::new(cx, AppData::name.map(|name| &name[0]));
    })
    .inner_size((400, 100))
    .run();
}
```

> Note that in this example we're assuming that the string is not empty.

![An empty vizia application window](/imgs/docs_img/stylesheet.png)
<img src="../docs_img/stylesheet.png alt="" width="400"/>

Now when the name field of the model changes the label will update to display the new first letter.

# Property Binding

A property binding updates just the style and layout properties of view in response to model data changes, instead of rebuilding the entire view. Most view modifiers accept a lens as input, which sets up a binding to the target data.

For example, we can bind the background color of a view, in this case a label, to a color property in the model data using a lens:

```rust
use vizia::prelude::*;

pub struct AppData {
    color: Color,
}

impl Model for AppData {}

fn main() {
    Application::new(|cx|{
        Label::new(cx, "Colorful")
            .background_color(AppData::color);
    }).run();
}
```

Most modifiers accept a lens to a type which can be converted to the expected type. For example, the `text` modifier accepts a lens to any value which implements `ToString`.

# Conditional Views

Using a `Binding` view a regular `if` statement can be used to conditionally rebuild views.

In the following example, a label view is built into the tree when a boolean state is true, else the view is removed from the tree.

```rust
use vizia::prelude::*;

#[derive(Lens)]
struct AppData {
    show_view: bool,
}

enum AppEvent {
    ToggleShowView,
}

impl Model for AppData {
    fn event(&mut self, cx: &mut Context, event: &mut Event) {
        event.map(|app_event, _| match app_event {
            AppEvent::ToggleShowView => self.show_view ^= true,
        });
    }
}

fn main() {
    Application::new(|cx|{

        AppData {
            show_view: false,
        }.build(cx);

        Label::new(cx, "Show View")
            .on_press(|cx| cx.emit(AppEvent::ToggleShowView));

        Binding::new(cx, AppData::show_view, |cx, show|{
            if show.get(cx) {
                Label::new(cx, "Surprise!");
            }
        });
    })
    .inner_size((400, 100))
    .run();
}
```
