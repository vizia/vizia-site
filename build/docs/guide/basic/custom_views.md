---
order: 8
---

# Custom Views

A custom view can be used to create re-usable components which can contain model data and react to events.

For this section of the book, let's create a somewhat complex custom view, a hsla color picker.

To create the color picker view, first we'll declare a struct with the desired viw name:

```rust
pub struct ColorPicker {

}
```

This struct can contain any data which is required by an instance of the view. For now we will leave this empty and fill it in as we go.

Next we'll implement the `View` trait on our `ColorPicker` type:

```rust
impl View for ColorPicker {}
```

Again we will leave this empty for now.

Next we'll write a `new` method so we can construct a `ColorPicker` view:

```rust
impl ColorPicker {
    pub fn new(cx: &mut Context) -> Handle<Self> {
        Self {

        }.build(cx, |cx|{

        })
    }
}
```

Let's unpack what we just wrote. The `new` method takes a mutable reference to the `Context` and returns a `Handle`. The `Handle` type has a generic which we've specified as `Self` (this part will be explained in a later section).

Within the `new` method we construct a new instance (with `Self{}`) and then call the `build` method on it, which comes from the `View` trait. The `build` method takes the mutable reference to the context, as well as a closure which provides that same context reference. For now we have left this closure empty.

This is all we need to be able to use our custom `ColorPicker` view in an application. We can assign style and layout properties to the view but it lacks any functionality and custom graphics that makes it an actual color picker.

```rust
use vizia::prelude::*;


```

# Custom View Composition

In the last section we built the skeleton for a custom `ColorPicker` view. In this section we're going to build out the body of the view using sub-views.

To keep things simple, the `ColorPicker` view will be made up of 5 sub-views. The first is another custom view which we will build and will allow us to pick a value and saturation from a 2D x-y pad. The other views are labels which will display the chosen

# Custom View Binding

# View Model Data

# View Event Handling

# Custom View Modifiers
