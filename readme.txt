If the user is a guest render certain components in Main,
If they logged in render the logged in components in main,
User context to access the logged in user object or guest object.\
https://redux.js.org/faq/performance
https://stackoverflow.com/questions/34995822/how-to-get-best-practice-react-redux-nested-array-data?noredirect=1&lq=1
https://hackernoon.com/shape-your-redux-store-like-your-database-98faa4754fd5
https://stackoverflow.com/questions/39695768/mapstatetoprops-in-redux-app-nesting-state-within-state


var links = [
  { endpoint: '/america' },
  { endpoint: '/canada' },
  { endpoint: '/norway' },
  { endpoint: '/bahamas' }
];

class Navigation extends React.Component {
  render() {
    const listItems = links.map((link) =>
        <li key={link.endpoint}>{link.endpoint}</li> 
    );
    return (
      <div className="navigation">
        <ul>
          {listItems}
        </ul>
      </div>
    );
}

https://reactjs.org/docs/conditional-rendering.html
Jurome