---
title: Application
---

Creating a new application creates a root `Window` and a [`Context`](https://docs.vizia.dev/vizia/context/struct.Context.html). Views declared within the closure passed to `Application::new()` are added to the context and rendered into the root window.

```rust
use vizia::prelude::*;

fn main() {
    Application::new(|cx|{
        // Content goes here
    })
    .run();
}
```

Calling `run()` on the `Application` causes the program to enter the event loop and for the main window to display.

![An empty vizia application window](/imgs/docs_img/application.png)

# Window Modifiers

When creating an `Application` the properties of the root window can be changed using [window modifiers](https://docs.vizia.dev/vizia/window/trait.WindowModifiers.html). These modifiers are methods called on the application prior to calling `run()`.

## Examples

### Window Title Modifier

The `title()` window modifier can be used to set the title of the root window.

```rust
use vizia::prelude::*;

fn main() {
    Application::new(|cx|{

    })
    .title("My Awesome Application")
    .run();
}
```

![A window with the title 'My Awesome Application'" width="400](/imgs/docs_img/window_title.png)

### Window Size Modifier

The `inner_size` window modifier can be used to set the initial size of the root window.

```rust
use vizia::prelude::*;

fn main() {
    Application::new(|cx|{

    })
    .inner_size((400, 200))
    .run();
}
```

![A window with its size set to 400 by 200" width="400](/imgs/docs_img/inner_size.png)
