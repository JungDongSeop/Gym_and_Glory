import React from 'react';
import WithNavBarAndSideBar from '../layout/WithNavBarAndSideBar';
import classes from './Ranking.module.css';

const Ranking = () => {
  return (
    <main className={classes.main}>
      <div>
        <p>개인 랭킹</p>
          
      </div>

      <div>
        <p>단체 랭킹</p>
      </div>
    </main>
  );
}


export default WithNavBarAndSideBar(Ranking);
