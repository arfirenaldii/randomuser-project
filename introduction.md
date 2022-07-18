This project using template from [react-boilerplate](https://github.com/react-boilerplate/react-boilerplate).

## Assumption
Because of this API can only fetch data and filter by gender, for pagination, searching, and sorting will manipulate in frontend. Data is only fetched with `results=50` as a initial data and filter by gender.

## Project Structure

### `app/`
Using [container/component architecture](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4rmjqneiw). `containers/` contains React components which are connected to the redux store. `components/` contains dumb React components which depend on containers for data. **Container components care about how things work, while components care about how things look.**

### `app/components`
General components that can be use to all containers. This project using self-made component to make more customizable and easy to maintain using `styled-components`.

### `app/containers`
Containers contain per page component with local components folder. For this project only use `Home` container.

## Data Flow
This project using two approaches, redux and react hooks.

### Redux
For state management using `react-redux` and `redux-saga` as middleware. Redux is used when fetching data from API https://randomuser.me/api/ and filter by gender to handle side effect and asynchronous process. `redux-saga` can communicate with redux actions, reducers, and constants. For trigger fetch data from API, each time actions `fetchUsers` with constants `FETCH_USERS`, `takeLatest` starts a new saga task `fetchUsers` and process actions `usersFetched` when success and `fetchUsersFailed` when failed.

### React hooks
React hooks is used for manipulate pagination, searched data, sorted data and other component interactions. Because we assume that this API can only fetch data and filter by date, we manipulate data from reducers with react hooks and using its lifecycle.