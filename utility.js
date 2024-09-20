// 这个文件目前是空的,因为我们没有特定的实用函数需要在这里定义。
// 如果将来需要添加一些通用的辅助函数,可以在这里实现。

// 例如，生成随机方块形状
function getRandomShape() {
    const shapes = [
        [[1, 1, 1, 1]], // I
        [[1, 1, 1], [0, 1, 0]], // T
        [[1, 1], [1, 1]], // O
        [[0, 1, 1], [1, 1, 0]], // S
        [[1, 1, 0], [0, 1, 1]] // Z
    ];
    return shapes[Math.floor(Math.random() * shapes.length)];
}

// 生成随机颜色
function getRandomColor() {
    const colors = [
        '#FF0D72', '#0DC2FF', '#0DFF72', '#F538FF',
        '#FF8E0D', '#FFE138', '#3877FF'
    ];
    return colors[Math.floor(Math.random() * colors.length)];
}