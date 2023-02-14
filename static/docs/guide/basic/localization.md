# Localization

Localization refers to the adaption of an application to meet the language, cultural, and other requirements of a specific target locale.

Localization refers to both translation of text, as well as other customizations such as[^note]:

1. Numeric, date and time formats
2. Plural categories
3. Currency
4. Keyboard usage
5. Bidirectional text
6. Symbols, icons and Colors
7. Text or graphics which may be subject to misinterpretation
8. Varying legal requirements
9. and many other things.

[^note]: https://www.w3.org/International/questions/qa-i18n

Vizia uses [Fluent](https://projectfluent.org/) to provide a way to localize text strings with expressive translations.

// TODO

- Simple text translation
- Fluent Syntax
- Specifying the Locale
- Pluralization
- Localizing Layout

# Translating Text

# Localizing Layout

# Localizing Views

Things like colors and symbols can have different meanings across cultures and languages, and so for some locales the contents of a view, or even the view itself, must be replaced. This can be achieved with a binding to the locale data in the `Environment` model.

For example, to replace a view based on the locale:

```rust
Binding::new(cx, Environment::locale, |cx, locale| {
    match locale.get(cx).to_string().as_ref() {
        "en-US" => {
            Element::new(cx).background_color(Color::from("#006847"));
        }

        "fr" => {
            Element::new(cx).background_color(Color::from("#004768"));
        }

        _ => {}
    }
});
```

Or we can change a style property based on the locale:

```rust
Element::new(cx).background_color(Environment::locale.map(|lang|{
    if lang.to_string() == "en-US"{
        Color::red()
    } else {
        Color::blue()
    }
}));
```

Or toggle a style class:

```rust
Element::new(cx)
    .toggle_class("eng", Environment::locale.map(|lang| lang.to_string() == "en-US"));
```
