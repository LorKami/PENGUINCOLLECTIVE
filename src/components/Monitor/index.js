import React, { useEffect } from 'react';
import '../Monitor/Monitor.css'

import Hat from '../../images/Cap.png'
import Eyes from '../../images/Fearful eyes.png'
import Glasses from '../../images/Fuck yeah glasses.png'
import Mouth from '../../images/Hungry beak.png'

import { FaDiscord } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';

import Traits from '../Traits'
import WVerificator from '../WVerificator';

const Monitor = () => {

  return (
    <div>

      <div className='Monitor'>

        <div className='MonitorNavbar'>
          <a href='https://twitter.com/PengCollectiv' target='blank'><FaXTwitter style={{ verticalAlign: 'middle' }} size='1.5rem' /></a>
          <a href='' target='blank'><FaDiscord style={{ verticalAlign: 'middle' }} size='1.5rem' /></a>

        </div>

        <div className='MonitorNFT'>

          <div className='MonitorNFTImages'>

            <img className='NFTHat' src={Hat} />
            <img className='NFTMouth' src={Mouth} />
            <img className='NFTGlasses' src={Glasses} />
            <img className='NFTEyes' src={Eyes} />

          </div>
        </div>

      </div>

      <div className='WVerificator'>
        {/* <WVerificator /> */}
        <h3>Verify if you are on the list coming soon</h3>
      </div>

      <div className='Traits'>
        <Traits />
      </div>


    </div>
  )
}

export default Monitor