import Feed from "@components/Feed"


const Home = () => {
  return (
    <section className="w-full flex-center flex-col">
       <h1 className="head_text text-center">
        Discover and Share
        <br />
        <span className="orange_gradient text-center">
          AI Powered Prompts
        </span>
        </h1>
        <p className="desc text-center text-color-gray-300">
          Pormptify give you enhanced prompts so that searching and using AI would be more effecient and you can discover as many as prompts you want to use .
        </p>
       <Feed/>
    </section>
  )
}

export default Home