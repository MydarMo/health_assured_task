import React from 'react';
import { ColorType } from '../interfaces/chips';
import { assignColor } from '../helpers/assign-color';

interface ChipProps {
  label: string;
  color: ColorType;
}

const Chip: React.FC<ChipProps> = ({ label, color}) => {
  return (
    <span data-testid='chip' className="chip" style={{ backgroundColor: assignColor(color)}}>
      {label}
    </span>
  );
};

export default Chip;
