# AGraphL

An eso-lang for generating graphs and diagrams with a focus on layout over ease of use.

AGraphL is a stack based post-fix language, with objects being pushed to a shared stack. Keywords pop from the stack and operate on items, potentially pushing new items into the stack. Any items left in the stack are rendered to an SVG.

## Keywords

- `@` Pop to reference
- `$` Copy to reference
- `%` Push reference to stack
- `&` Create Label
  - `"<String>" &`
- `[` Create Square
  - `<Label> [`
- `<` To the left of
  - `<Square> <Square> <`  Return both to stack, second is modified
  - `<Square> <Square> <-`  Return only modified to stack
- `v` Bellow
  - `<Square> <Square> v` Return both to stack, second is modified
  - `<Square> <Square> v-` Return only modified to stack

## Examples

Render a Label (`&`) inside a Square (`[`) containing "Hello"
```agl
"Hello" & [
```

Render `Hello` to the left of `World`
```agl
"Hello" & [ "World" & [ <
```

Render `Bellow` underneath `World`
```agl
"World" & [ "Bellow" & [ v
```

Render `Hello` to the left of `World` with `Bellow` being under `World`
```agl
"Hello" & [ $H
"World" & [ <
%H "Bellow" & [ v <-
```

## Usage

```sh
pnpm install
pnpm run build
chmod +x out/bin
./out/bin example.agl
```
