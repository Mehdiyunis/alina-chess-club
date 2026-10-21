import React from 'react';

export type PieceType = 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
export type PieceColor = 'w' | 'b';

interface ChessPieceProps {
  type: PieceType;
  color: PieceColor;
  className?: string;
  size?: number | string;
}

export const ChessPieceSvg: React.FC<ChessPieceProps> = ({
  type,
  color,
  className = 'w-full h-full drop-shadow-md',
}) => {
  const isWhite = color === 'w';
  const fillColor = isWhite ? '#FFFFFF' : '#141126';
  const strokeColor = isWhite ? '#1e1a38' : '#2d2750';
  const innerDetailColor = isWhite ? '#211c3a' : '#d2cbfa';

  switch (type.toLowerCase()) {
    case 'k': // King / Şah
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.5 11.63V6M20 8h5"
            stroke={innerDetailColor}
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M22.5 25c0 0 4.5-7.5 3-10.5-1.5-3-6-3-6 0-1.5 3 3 10.5 3 10.5z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          <path
            d="M11.5 37c5.5 3.5 15.5 3.5 21 0v-7s9-4.5 6-10.5c-4-1-6 2-6 2s1-4-3-5.5c-4-1.5-7 1.5-7 1.5s-3-3-7-1.5c-4 1.5-3 5.5-3 5.5s-2-3-6-2c-3 6 6 10.5 6 10.5v7z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          <path
            d="M11.5 30c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0m-21 3.5c5.5-3 15.5-3 21 0"
            stroke={innerDetailColor}
            strokeWidth="1.2"
          />
        </svg>
      );

    case 'q': // Queen / Vəzir
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="6" cy="12" r="2.2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="14" cy="9" r="2.2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="22.5" cy="8" r="2.2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="31" cy="9" r="2.2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
          <circle cx="39" cy="12" r="2.2" fill={fillColor} stroke={strokeColor} strokeWidth="1.2" />
          <path
            d="M9 26c8.5-1.5 21-1.5 27 0l2-12-7 11-7.5-14-7.5 14-7-11 2 12z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          <path
            d="M9 26c0 2 1.5 2 2.5 4 1 1.5 1 1 .5 3.5-1.5 1-1.5 2.5-1.5 2.5-1.5 1.5.5 2.5.5 2.5 6.5 1 17.5 1 24 0 0 0 2-1 .5-2.5 0 0 0-1.5-1.5-2.5-.5-2.5-.5-2 .5-3.5 1-2 2.5-2 2.5-4-8.5-1.5-18.5-1.5-27 0z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          <path
            d="M11 38.5c7-1 16-1 23 0m-22.5-4c6.5-1 16-1 22 0"
            stroke={innerDetailColor}
            strokeWidth="1.2"
          />
        </svg>
      );

    case 'r': // Rook / Top
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9 39h27v-3H9v3zm3-3v-1.5h21V36H12zm2-1.5v-17h17v17H14zm-3-17h23v-6h-3.5v3h-4v-3h-4v3h-4v-3H11v6z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path
            d="M12 35.5h21m-18-18h15m-15 4h15m-15 4h15m-15 4h15"
            stroke={innerDetailColor}
            strokeWidth="1"
          />
        </svg>
      );

    case 'b': // Bishop / Fil
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <g fill={fillColor} stroke={strokeColor} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 36c3.39-.97 10.11.43 13.5-2 3.39 2.43 10.11 1.03 13.5 2 0 0 1.65.54 3 2-.68.97-1.65.99-3 .5-3.39-.97-10.11.46-13.5-1-3.39 1.46-10.11.03-13.5 1-1.35.49-2.32.47-3-.5 1.35-1.46 3-2 3-2z" />
            <path d="M15 32c2.5 2.5 12.5 2.5 15 0 .5-1.5 0-2 0-2 0-2.5-2.5-4-2.5-4 5.5-1.5 6-11.5-5-15.5-11 4-10.5 14-5 15.5 0 0-2.5 1.5-2.5 4 0 0-.5.5 0 2z" />
            <circle cx="22.5" cy="8.5" r="2.2" />
          </g>
          <path
            d="M17.5 26h10M22.5 21v10M20 15l5 5"
            stroke={innerDetailColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      );

    case 'n': // Knight / At
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 10c10.5 1 16.5 8 16 29H15c0-9 10-6.5 8-21"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          <path
            d="M24 18c.33 1 1 2 1 3.5 0 1.5-.5 2.5-1.5 3.5-1 1-2 1.5-3.5 1.5s-2.5-.5-3.5-1.5c-1-1-1.5-2-1.5-3.5 0-1.5.67-2.5 1-3.5.33-1 .5-2 1.5-2.5 1-.5 2-.5 3-.5 1 0 2 .5 2.5 1.5.5 1 .7 1.5 1 1.5z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          <path
            d="M9.5 25.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm12-9.5c-3 1-5 4-5 8 0 3 2 5 5 5 2 0 4-1 5-3"
            stroke={innerDetailColor}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="15" cy="18" r="1.5" fill={innerDetailColor} />
          <path
            d="M9 39h27v-3H9v3z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
        </svg>
      );

    case 'p': // Pawn / Piyada
    default:
      return (
        <svg viewBox="0 0 45 45" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22.5 9c-2.21 0-4 1.79-4 4 0 .89.29 1.71.78 2.38C17.33 16.5 16 18.59 16 21c0 2.03.94 3.84 2.41 5.03-3 1.06-7.41 5.55-7.41 13.47h23c0-7.92-4.41-12.41-7.41-13.47 1.47-1.19 2.41-3 2.41-5.03 0-2.41-1.33-4.5-3.28-5.62.49-.67.78-1.49.78-2.38 0-2.21-1.79-4-4-4z"
            fill={fillColor}
            stroke={strokeColor}
            strokeWidth="1.5"
          />
          <path
            d="M12 36.5c4-1 17-1 21 0M17 26.5c3-.5 8-.5 11 0"
            stroke={innerDetailColor}
            strokeWidth="1.2"
          />
        </svg>
      );
  }
};
