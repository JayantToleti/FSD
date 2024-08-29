
import { Provider } from "react-redux";
import { Home } from "./components/Home";
import { store } from './redux/store/index';


export const App = () => {
  return (
    <Provider store={store}>
      <Home />
    </Provider>
  );
};
