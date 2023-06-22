# React Tiny Horizontal Scrolling

An horizontal scrolling component for react

## Install

```sh
$ npm install react-tiny-horizontal-scrolling
```

or

```sh
$ yarn add react-tiny-horizontal-scrolling
```

## Example

```ts
<HorizontalScrolling
  data={[1, 2, 3, 4, 5, 6].map((item, index) => (
    <div key={index} style={{ width: 400, background: 'red', padding: 20, margin: 10 }}>{item}</div>
  ))}
/>
```

Enjoy !