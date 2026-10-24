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
  className = 'w-full h-full object-contain pointer-events-none select-none',
}) => {
  const code = `${color}${type.toUpperCase()}`;
  const pieceNameMap: Record<string, string> = {
    wK: 'Ağ Şah',
    wQ: 'Ağ Vəzir',
    wR: 'Ağ Top',
    wB: 'Ağ Fil',
    wN: 'Ağ At',
    wP: 'Ağ Piyada',
    bK: 'Qara Şah',
    bQ: 'Qara Vəzir',
    bR: 'Qara Top',
    bB: 'Qara Fil',
    bN: 'Qara At',
    bP: 'Qara Piyada',
  };

  return (
    <img
      src={`/pieces/${code}.svg`}
      alt={pieceNameMap[code] || 'Şahmat fiquru'}
      className={className}
      draggable={false}
      loading="lazy"
    />
  );
};
