import { Bonus } from './components/Bonus/Bonus';
import { Lead } from './components/Lead/Lead';
import { StatusBar } from './components/StatusBar/StatusBar';
import './styles/index.scss';

export const App = () => {
  return (
    <div className="app">
      <header className="App-header">
        <StatusBar />
      </header>
      <div>
        <Lead />
        <Bonus />
      </div>
    </div>
  )
}
