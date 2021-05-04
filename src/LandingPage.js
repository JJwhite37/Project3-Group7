import AboutEcommMiner from './AboutEcommMiner';

function LandingPage() {
    return (
      <div>
        <h1>Hello this is EcommMiner</h1>
        <h2>  Functionality: </h2>
        <p>
          This application was created as a MVP for tracking shares.  
          First, a person must login with their email and provide their worker_name.  New users will be able to log in but show 0 shares. 
        </p> 
        <p>
          Once logged in, We display all the information from a flexpool api in an easy to understand Daahboard.  
        </p>
        <p>
          All logged in miners will be able to see their own and the wallets statistics. 
        </p>
        <p>
          This dashboard also has Discord Integration so miners from the same wallet has a place they could interact with and build a community based on.
        </p>
        <p>
          We also showcase the leaderboard for all the people mining for that company so the company can see the dedicated miners and reward them somehow.
          They will also be able to see the users who mined in the last 24 hours.
        </p>
        
        <h2>  Why we matter: </h2>
        <p>
          EcommMiner can be the future of selling computation. Using a dashboard like ours, other businesses will be able to keep track of all the people mining for them. This allows the customers to visually see how much they mine and an easy way to see who is actually a committed miner for that business.Abadio
          
        </p>
        
        <h2>  Who is it made by: </h2>
        <p>
          EcommMiner was created by a collaboration between 4 senior CS students, Joseph Stapleton, Jacob White, Nick Abadio, Lasha Tavberidze.
        </p>
        <p> 
          We are very exited to showcase our knowledge and provide an actual working application that could be the future of commercial computation.
        </p>
      </div>
    );
}

export default LandingPage;
