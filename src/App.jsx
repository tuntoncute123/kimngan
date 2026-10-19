import Oct20Page from './components/Oct20Page';

function App() {
  return (
    <div className="kimngan-app">
      <Oct20Page onBack={() => window.location.reload()} />
    </div>
  );
}

export default App;
