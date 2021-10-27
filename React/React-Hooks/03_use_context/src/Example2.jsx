import React, {useContext} from "react";

const UserContext = React.createContext();
const NewsContext = React.createContext();

function AppComponent() {
    return (
        <UserContext.Provider value={{name: 'vi'}}>
            <NewsContext.Provider value={{'title': 'Reacts hooks'}}>
                <ChildComponent/>
            </NewsContext.Provider>
        </UserContext.Provider>
    )
}

function ChildComponent() {
    const user = useContext(UserContext);
    const news = useContext(NewsContext);
    return (
        <div>
            {user.name} - {news.title}
        </div>
    )
}

export default AppComponent;
