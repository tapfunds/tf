// https://jasonwatmore.com/post/2020/10/22/react-router-v5-fix-for-redirects-not-rendering-when-using-custom-history
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();