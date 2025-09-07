import Card from "../components/Card";

const Home = () => {
    return (
        <>
            <div>Hello</div>
            <Card
                picture="public/assets/img/pizza/Hawaiian.png"
                title="Hawaiian"
                subtitle="Ham, Bacon, Pineapple, Mozzarella Cheese and Pizza Sauce"
                price={379}
                onAdd={() => console.log("add to cart")}
            />
        </>
    )
}

export default Home;