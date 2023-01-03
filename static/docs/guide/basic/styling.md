---
order: 3
---

# Styling

Styling refers to modifying the visual properties of a view, such as its background, border, font, etc. A full list of available style properties can be found on the [style properties](#style-properties) page.

There are two methods for styling views in Vizia:

1. [Inline](#inline-styling-style-modifiers) - which applies style properties directly to a single view.
2. [Shared](#shared-styling) - which uses CSS rules to apply styling to any views which match the rules.

# Inline Styling (Style Modifiers)

Inline styling refers to applying style modifiers directly on views in Rust code.

The following example shows how the background color of a view can be modified by a call to a function directly on the view.

```rust
use vizia::prelude::*;

fn main() {
    Application::new(cx, |cx|{
        Label::new(cx, "Hello World")
            .background_color(Color::red());
    })
    .inner_size((400, 100))
    .run();
}
Element::new(cx).background_color(Color::red());
```

> Note: Inline style properties override any shared styling which targets the same view.

## Property Binding

As initially shown in the [modifiers section](/guide/basic/views#modifiers), and detailed in the [property binding section](/guide/basic/binding#property-binding), most style modifiers accept a lens as input, which sets up a binding to the corresponding model data.

When the model data changes (usually in response to an event), the property bound to the data will update accordingly.

# Shared Styling

Shared styling uses Cascading Style Sheets (CSS) to apply style rules to multiple views simultaneously. A CSS string can be defined within a rust file as a constant, or within an external CSS file.

To add a stylesheet which is already a string in rust code, use the `add_theme()` method on `Context`. For example:

```rust
use vizia::prelude::*;

const STYLE: &str = r#"
    element {
        background-color: red;
    }
"#

fn main() {
    Application(WindowDescription::new(), |cx|{

        cx.add_theme(STYLE);

        Element::new(cx)
            .size(Pixels(100.0));
    })
}
```

To add a stylesheet which is defined in a separate `.css` file, use `add_stylesheet()` method on `Context` with the file path. For example:

```css
/* style.css */
element {
	background-color: blue;
}
```

```rust
/* main.rs */
use vizia::prelude::*;

fn main() {
    Application(WindowDescription::new(), |cx|{

        cx.add_stylesheet("style.css");

        Element::new(cx)
            .size(Pixels(100.0));
    })
}
```

> Note: External stylesheets can be hot-reloaded using the F5 key while the application is running.

> Note: Vizia does not currently support the entire CSS standard.

# Stylesheets

Vizia currently supports only a small subset of the CSS standard. This section provides an overview and reference of the supported CSS selectors, selector combinators, pseudo-classes, and pseudo-elements available in vizia. The following section provides a list of available style properties.

## Style Rules

A typical style rule might look something like this:

```css
hstack.one label {
	background-color: red;
	width: 30px;
}
```

The first part before the opening brace is called a selector, which determines which views the rule applies to, and the part inside the brackets are a list of properties and values to apply to the styling of matching views.

## Selectors

- `id (#id-name)`

Selects elements with the specified id name. An id name can be added to a view with the `id` style modifier and must be a unique name.

- `element (element-name)`

Selects elements with the specified element name. The element name of a view is specific to its type and is given by the return value of the `element` method on the `View` trait implementation.

- `class (.class-name)`

Selects elements with the specified class name. A class name cab be added to a view with the `class` style modifier. The `toggle_class` modifier can be used to conditionally add/remove a class from a view, typically with the use of a lens to a boolean.

```rust
// When the boolean value `AppData::flag` is true, the view has the class name 'foo'.
Element::new(cx).toggle_class("foo", AppData::flag);
```

- `universal (*)`

Selects all elements.

## Selector Combinators

- `descendant (space)`

Selects elements which match the selector after the space if they are descended from an element which matches the selector before the space. For example:

```css
hstack label {
}
```

will select any `Label` which has an `HStack` as an ancestor further up the [tree](/guide/basic/view_tree).

- `child (>)`

Selects elements which match the selector after the space if they are the child of an element which matches the selector before the space. For example:

```css
hstack > label {
}
```

will select any `Label` which has an `HStack` as a parent.

## Pseudo-classes

- `:root`

Selects the root window.

- `:hover`

Selects the currently hovered element.

- `:checked`

Selects any element which has been marked as checked. A view can be marked as checked with the `checked` style modifier.

- `:disabled`

Selects any element which has been marked as disabled. A view can be marked as disabled with the `disabled` style modifier.

- `:active`

Selects any element which has been marked as active.

- `:focus`

Selects the currently focused view.

- `:focus-visible`

Selects the currently focused view if the view was focused via keyboard navigation.

## Pseudo-elements

_Not currently supported_

<!-- ## Selectors
Styling in CSS works by matching rules to views. A *style rule* is made up of a selector followed by a declaration, i.e. a list of properties and their desired values.

The selector determines which views the rule applies to. For example, the following rule applies to any `Button` view in the application:

```css
button {
    background-color: red;
}
```


### Element Name
The `button` keyword here is an element name and is used to select views of a certain type, e.g. all buttons or all checkboxes. The element name of a view is determine by the `element()` method in the view trait, for example:

```rust
impl View for Button {
    fn element(&self) -> Option<&'static str> {
        Some("button")
    }
}
```

### Class Name
It is also possible to add one or more class names to views using the `.class()` modifier:

```rust
Element::new(cx).class("foo");
```

These class names can then be used in selectors to target these views:

```css
.foo {
    background-color: red;
}
```
> Note that class names in CSS begin with a '.'

There is also a `.toggle_class()` modifier for toggling a class name on a view using a boolean or a lens to some boolean state:

```rust
Element::new(cx).toggle_class("foo", AppData::flag);
```

When `AppData::flag` is true then the class name `foo` is added to the view, and removed when `AppData::flag` is false.

### Id Name
An id name can be used to select a specific view. The id name is applied using the `.id()` modifier:

```rust
Element::new(cx).id("bar");
```
Which can then be selected in CSS:

```css
#bar {
    background-color: red;
}
```
> Note that id names in CSS begin with a '#'

Unlike class names, id names are unique and cannot be shared between multiple views.

### Pseudo-Classes
Pseudo-classes allow specifying style rules based on the state of a view.

For example, the background color of a button can be changed from red to blue when hovered with the following CSS:

```css
button {
    background-color: red;
}

button:hover {
    background-color: blue;
}
```

The pseudo-class selector, `hover`, is applied to the element name selector, `button`, to specify the style change that should occur when the button is hovered with the mouse cursor.

There are currently 7 available pseudo-class selectors:

1. Hovered
2. Pressed
3. Checked
4. Disabled
5. Selected
6. Active
7. Focused -->

# Style properties

This section provides a list of the currently supported style properties in vizia.

For the corresponding CSS property names, replace any underscore with a hyphen. For example, `background_color` in Rust becomes `background-color` in CSS.

### Display

- `display`
- `visibility`
- `overflow`
- `z_index`

### Background

- `background_color`
- `background_image`
- `background_gradient`

### Border

- `border_width`
- `border_color`
- `border_radius`
- `border_top_left_radius`
- `border_top_right_radius`
- `border_bottom_left_radius`
- `border_bottom_right_radius`
- `border_corner_shape`
- `border_top_left_shape`
- `border_top_right_shape`
- `border_bottom_left_shape`
- `border_bottom_right_shape`

### Outline

- `outline_width`
- `outline_color`
- `outline_offset`

### Box Shadow
