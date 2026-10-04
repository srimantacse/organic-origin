import {
  Leaf, Eye, Target, Recycle, Award, HandHeart, Users, Globe2,
  Sprout, Flame, Sun, Carrot, Citrus, Wheat, Coffee, Flower2,
  Droplet, Package, Hand, Settings2, Truck,
} from 'lucide-react';
import { MushroomIcon } from './CustomIcons';

export const iconMap = {
  Leaf, Eye, Target, Recycle, Award, HandHeart, Users, Globe2,
  Sprout, Flame, Sun, Carrot, Citrus, Wheat, Coffee, Flower2,
  Droplet, Package, Hand, Settings2, Truck,
  Mushroom: MushroomIcon,
};

export function Icon({ name, size = 24, className, strokeWidth }) {
  const Cmp = iconMap[name] || Leaf;
  return <Cmp size={size} className={className} strokeWidth={strokeWidth} />;
}
