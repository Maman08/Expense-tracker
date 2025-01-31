import { Sun, Moon } from 'lucide-react';
import { Button } from '../ui/button';
import { useTheme } from '../theme/ThemeProvider';

const ModeToggle = () => {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="outline"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="h-[40px] w-[40px] p-0 flex items-center justify-center"
    >
      {theme === 'light' ? (
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      ) : (
        <Sun className="h-[1.2rem] w-[1.2rem]" />
      )}
    </Button>
  );
};

export default ModeToggle;
