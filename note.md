# useEffect()

## Khi nào dùng?

Khi component React cần thực hiện một việc **bên ngoài React** (side effect) → dùng Effect Hook.

Ví dụ: gọi API là thao tác với một hệ thống bên ngoài (external system), nên `useEffect` phù hợp để thực hiện việc đó.

Luồng: **React component → gọi server → nhận dữ liệu → cập nhật state**

## Cú pháp

```js
useEffect(effect, [dependencies])
```

- `effect`: function chứa công việc cần thực hiện
- `dependencies`: mảng phụ thuộc, quy định **khi nào** effect được chạy lại

## Cơ chế hoạt động

- React thực hiện effect **sau khi component đã render xong**, không phải trong lúc render.
- Thứ tự thực thi là điều quan trọng nhất cần nhớ khi dùng `useEffect`.

## Ba trường hợp của dependency array

| Cách dùng                    | Effect chạy khi nào                                     |
| ----------------------------- | --------------------------------------------------------- |
| `useEffect(effect)` (không có mảng) | Sau **mỗi lần** component render lại                       |
| `useEffect(effect, [])`       | Chỉ **một lần duy nhất**, sau lần render đầu tiên          |
| `useEffect(effect, [a, b])`   | Sau lần render đầu tiên, và mỗi khi `a` hoặc `b` thay đổi |

## Lưu ý quan trọng

Nếu không truyền dependency array, effect sẽ chạy lại sau **mỗi lần** render. Nếu effect đó gọi API rồi `setState`, thao tác này sẽ gây re-render → effect chạy lại → gọi API lại → **vòng lặp vô hạn (infinite loop)**.

Vì vậy khi fetch dữ liệu trong `useEffect`, gần như luôn cần truyền `[]` để effect chỉ chạy một lần, trừ khi bạn cố tình muốn nó chạy lại theo một dependency cụ thể.
