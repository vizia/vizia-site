#[derive(Clone, Copy, Debug, Eq, PartialEq, PartialOrd)]
struct Highlight {
    line: usize,
    start: usize,
    length: usize,
}
