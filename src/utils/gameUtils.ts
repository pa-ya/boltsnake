import { Point, Direction, GridSize } from '../types';

// Generate a random position for food that's not on the snake
export const generateFood = (snake: Point[], gridSize: GridSize): Point => {
  const food: Point = {
    x: Math.floor(Math.random() * gridSize.width),
    y: Math.floor(Math.random() * gridSize.height),
  };

  // If the generated food position is on the snake, regenerate
  if (snake.some(segment => segment.x === food.x && segment.y === food.y)) {
    return generateFood(snake, gridSize);
  }

  return food;
};

// Calculate the next position of the snake's head based on direction
export const getNextHeadPosition = (head: Point, direction: Direction, gridSize: GridSize): Point => {
  switch (direction) {
    case Direction.UP:
      return { x: head.x, y: (head.y - 1 + gridSize.height) % gridSize.height };
    case Direction.DOWN:
      return { x: head.x, y: (head.y + 1) % gridSize.height };
    case Direction.LEFT:
      return { x: (head.x - 1 + gridSize.width) % gridSize.width, y: head.y };
    case Direction.RIGHT:
      return { x: (head.x + 1) % gridSize.width, y: head.y };
    default:
      return head;
  }
};

// Check if the snake has collided with itself
export const checkCollision = (head: Point, body: Point[], gridSize: GridSize): boolean => {
  // Check if snake collides with its own body
  return body.some(segment => segment.x === head.x && segment.y === head.y);
};

// Get color based on segment index for gradient effect
export const getSegmentColor = (index: number, total: number): string => {
  const hue = 130 + (index / total) * 60; // Green to blue gradient
  return `hsl(${hue}, 100%, 60%)`;
};

// Generate a unique key for a snake segment
export const getSegmentKey = (point: Point, index: number): string => {
  return `${point.x}-${point.y}-${index}`;
};

// Calculate the rotation angle for the snake head based on direction
export const getHeadRotation = (direction: Direction): number => {
  switch (direction) {
    case Direction.UP:
      return 0;
    case Direction.DOWN:
      return 180;
    case Direction.LEFT:
      return 270;
    case Direction.RIGHT:
      return 90;
    default:
      return 0;
  }
};

// Get the CSS position for a point on the grid
export const getPositionStyle = (point: Point, cellSize: number): React.CSSProperties => {
  return {
    left: `${point.x * cellSize}px`,
    top: `${point.y * cellSize}px`,
    width: `${cellSize}px`,
    height: `${cellSize}px`,
  };
};