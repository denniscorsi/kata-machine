function walk(
    maze: string[],
    wall: string,
    end: Point,
    current: Point,
    seen: Boolean[][],
    path: Point[],
): boolean {
    let x: number = current.x;
    let y: number = current.y;
    const directions: number[][] = [
        [0, 1],
        [1, 0],
        [-1, 0],
        [0, -1],
    ];

    // base cases:
    // 1. We've reach the end: true
    if (x === end.x && y === end.y) {
        path.push(end);
        return true;
    }
    // 2. This is a wall: false
    if (maze[y][x] === wall) return false;
    // 3. This is off the maze: false
    if (x < 0 || y < 0 || x >= maze[0].length || y >= maze.length) return false;
    // 4. We've been here before: false
    if (seen[y][x]) return false;

    seen[y][x] = true;
    path.push(current);
    for (const direction of directions) {
        const valid = walk(
            maze,
            wall,
            end,
            { x: x + direction[0], y: y + direction[1] },
            seen,
            path,
        );
        if (valid) return true;
    }
    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const seen: Boolean[][] = [];
    const path: Point[] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, end, start, seen, path);
    return path;
}
