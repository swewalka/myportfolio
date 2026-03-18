import CursorManager from './components/cursor/CursorManager';
import Home from './components/home/Home';
import ThemeProvider from './components/themes/ThemeManager';

function App() {
  return (
    <ThemeProvider>
      <CursorManager>
        <Home />
      </CursorManager>
    </ThemeProvider>
  );
}

export default App;
