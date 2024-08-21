import {Button} from "../components/Button.tsx";
import MainContent from "../components/MainContainer.tsx";


function Home(){
    return (
        <MainContent>
        <h1>HOME</h1>
        <Button onClick={null} label={"siema"}/>
            <Button onClick={null} label={"siema"}/>
            <Button onClick={null} label={"siema"}/>
        </MainContent>
    );
}

export default Home;