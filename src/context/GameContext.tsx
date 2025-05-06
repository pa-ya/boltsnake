import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Point, Direction, GameState, Difficulty } from '../types';
import { generateFood, checkCollision, getNextHeadPosition } from '../utils/gameUtils';

interface GameContextProps {
  state: GameContextState;
  dispatch: React.Dispatch<GameAction>;
  moveSnake: () => void;
  setDirection: (direction: Direction) => void;
  startGame: () => void;
  pauseGame: () => void;
  resetGame: () => void;
  toggleSound: () => void;
  changeDifficulty: (difficulty: Difficulty) => void;
}

interface GameContextState {
  snake: Point[];
  food: Point;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  highScore: number;
  gameState: GameState;
  soundEnabled: boolean;
  difficulty: Difficulty;
  gridSize: { width: number; height: number };
}

type GameAction =
  | { type: 'MOVE_SNAKE' }
  | { type: 'SET_DIRECTION'; payload: Direction }
  | { type: 'START_GAME' }
  | { type: 'PAUSE_GAME' }
  | { type: 'RESET_GAME' }
  | { type: 'GAME_OVER' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'CHANGE_DIFFICULTY'; payload: Difficulty };

const initialState: GameContextState = {
  snake: [{ x: 10, y: 10 }],
  food: { x: 5, y: 5 },
  direction: Direction.RIGHT,
  nextDirection: Direction.RIGHT,
  score: 0,
  highScore: 0,
  gameState: GameState.START,
  soundEnabled: true,
  difficulty: Difficulty.MEDIUM,
  gridSize: { width: 20, height: 20 },
};

const gameReducer = (state: GameContextState, action: GameAction): GameContextState => {
  switch (action.type) {
    case 'MOVE_SNAKE': {
      const head = state.snake[0];
      const newHead = getNextHeadPosition(head, state.nextDirection, state.gridSize);
      
      // Check if snake eats food
      const ateFood = newHead.x === state.food.x && newHead.y === state.food.y;
      
      // Create new snake body
      let newSnake;
      if (ateFood) {
        newSnake = [newHead, ...state.snake];
      } else {
        newSnake = [newHead, ...state.snake.slice(0, -1)];
      }
      
      // Check for collisions
      if (checkCollision(newHead, state.snake.slice(1), state.gridSize)) {
        return {
          ...state,
          gameState: GameState.GAME_OVER,
          highScore: Math.max(state.score, state.highScore),
        };
      }
      
      return {
        ...state,
        snake: newSnake,
        direction: state.nextDirection,
        food: ateFood ? generateFood(newSnake, state.gridSize) : state.food,
        score: ateFood ? state.score + 10 : state.score,
      };
    }
    case 'SET_DIRECTION':
      // Prevent 180-degree turns
      const isOpposite = (
        (state.direction === Direction.UP && action.payload === Direction.DOWN) ||
        (state.direction === Direction.DOWN && action.payload === Direction.UP) ||
        (state.direction === Direction.LEFT && action.payload === Direction.RIGHT) ||
        (state.direction === Direction.RIGHT && action.payload === Direction.LEFT)
      );
      
      if (isOpposite) {
        return state;
      }
      
      return {
        ...state,
        nextDirection: action.payload,
      };
    case 'START_GAME':
      return {
        ...state,
        gameState: GameState.PLAYING,
      };
    case 'PAUSE_GAME':
      return {
        ...state,
        gameState: GameState.PAUSED,
      };
    case 'RESET_GAME':
      return {
        ...initialState,
        highScore: state.highScore,
        soundEnabled: state.soundEnabled,
        difficulty: state.difficulty,
        food: generateFood([{ x: 10, y: 10 }], state.gridSize),
      };
    case 'GAME_OVER':
      return {
        ...state,
        gameState: GameState.GAME_OVER,
        highScore: Math.max(state.score, state.highScore),
      };
    case 'TOGGLE_SOUND':
      return {
        ...state,
        soundEnabled: !state.soundEnabled,
      };
    case 'CHANGE_DIFFICULTY':
      return {
        ...state,
        difficulty: action.payload,
      };
    default:
      return state;
  }
};

export const GameContext = createContext<GameContextProps>({} as GameContextProps);

export const useGame = () => useContext(GameContext);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedHighScore, setSavedHighScore] = useLocalStorage('snakeHighScore', 0);
  const [savedSoundEnabled, setSavedSoundEnabled] = useLocalStorage('snakeSoundEnabled', true);
  const [savedDifficulty, setSavedDifficulty] = useLocalStorage('snakeDifficulty', Difficulty.MEDIUM);

  const [state, dispatch] = useReducer(gameReducer, {
    ...initialState,
    highScore: savedHighScore,
    soundEnabled: savedSoundEnabled,
    difficulty: savedDifficulty,
    food: generateFood([{ x: 10, y: 10 }], initialState.gridSize),
  });

  useEffect(() => {
    setSavedHighScore(state.highScore);
  }, [state.highScore, setSavedHighScore]);

  useEffect(() => {
    setSavedSoundEnabled(state.soundEnabled);
  }, [state.soundEnabled, setSavedSoundEnabled]);

  useEffect(() => {
    setSavedDifficulty(state.difficulty);
  }, [state.difficulty, setSavedDifficulty]);

  const moveSnake = () => {
    if (state.gameState === GameState.PLAYING) {
      dispatch({ type: 'MOVE_SNAKE' });
    }
  };

  const setDirection = (direction: Direction) => {
    dispatch({ type: 'SET_DIRECTION', payload: direction });
  };

  const startGame = () => {
    dispatch({ type: 'START_GAME' });
  };

  const pauseGame = () => {
    dispatch({ type: 'PAUSE_GAME' });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  const toggleSound = () => {
    dispatch({ type: 'TOGGLE_SOUND' });
  };

  const changeDifficulty = (difficulty: Difficulty) => {
    dispatch({ type: 'CHANGE_DIFFICULTY', payload: difficulty });
  };

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
        moveSnake,
        setDirection,
        startGame,
        pauseGame,
        resetGame,
        toggleSound,
        changeDifficulty,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};