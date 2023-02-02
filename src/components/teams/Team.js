import React from 'react';
import './team.scss';
import MoniqueImg from '../images/teamImage/monique.jpg';
import HarperImg from '../images/teamImage/harper.jpeg';

const Team = props => {

 const teamMember =[
    {
        name: 'Addison Hill',
        role: 'Web Developer',
        img: `https://ca.slack-edge.com/T4JUEB3ME-UMQM1MNKH-1d5909d99a26-512`,
        icon1: 'fab fa-linkedin',
        link1: ``,
        icon2: 'fab fa-github',
        link2: `https://github.com/addison-hill`
    },
    {
        name: 'Bradley Peterson',
        role: 'Web Developer',
        img: `https://ca.slack-edge.com/T4JUEB3ME-UJ5LQNQ5T-748b164f3522-512`,
        icon1: 'fab fa-linkedin',
        link1: ``,
        icon2: 'fab fa-github',
        link2: `https://github.com/Boltsnut24`
    },
    {
        name: 'John Rhee',
        role: 'Web Developer',
        img: `https://ca.slack-edge.com/T4JUEB3ME-UL8K57H2A-7405f012abc6-512`,
        icon1: 'fab fa-linkedin',
        link1: `https://www.linkedin.com/in/john-rhee/`,
        icon2: 'fab fa-github',
        link2: `https://github.com/john-rhee`
    },
    {
        name: 'Krunal Patel',
        role: 'Web Developer',
        img: `https://ca.slack-edge.com/T4JUEB3ME-UMNR6SSE9-a8420b436b44-512`,
        icon1: 'fab fa-linkedin',
        link1: `https://www.linkedin.com/in/krunal-p-16bb8b15b/`,
        icon2: 'fab fa-github',
        link2: `https://github.com/Krunal1997patel`
    },
    {
        name: 'Monique Soto',
        role: 'UX/UI Designer',
        img: MoniqueImg,
        icon1: 'fab fa-linkedin',
        link1: `https://www.linkedin.com/in/moniquesoto/`,
        icon2: 'fab fa-dribbble-square',
        link2: ``
    },
    {
        name: 'Nicolas Janes',
        role: 'Web Developer',
        img: `https://ca.slack-edge.com/T4JUEB3ME-UMNR716JH-f74a24222507-512`,
        icon1: 'fab fa-linkedin',
        link1: ``,
        icon2: 'fab fa-github',
        link2: `https://github.com/nijanes97`
    },
    {
        name: 'Ruwaidah Alfakhri',
        role: 'Web Developer',
        img: `https://ca.slack-edge.com/T4JUEB3ME-UMBBZ9SH1-6c2a48e8b614-512`,
        icon1: 'fab fa-linkedin',
        link1: `https://www.linkedin.com/in/ruwaidah-a-930b9a8b/`,
        icon2: 'fab fa-github',
        link2: `https://github.com/Ruwaidah`
    },
    {
        name: 'Harper Atlas',
        role: 'Team Lead',
        img: HarperImg,
        icon1: 'fab fa-linkedin',
        link1: `https://www.linkedin.com/in/harper-atlas/`,
        icon2: 'fab fa-dribbble-square',
        link2: ``
    }
 ]


    return(
        <div className='team-page'>
            <h1 className='text'>Meet our team</h1>
            <div className='team-info'>
                {
                    teamMember.map(team =>(
                        <div className='info'>
                            <img className='team-img' src={team.img} alt={team.name}/>
                            <h2 className='name'>{team.name}</h2>
                            <h3 className='role'>{team.role}</h3>
                            <div className='team-icons'>
                                <a className='team-link' href={team.link1} target='_blank'><i className={team.icon1}></i></a>
                                <a className='team-link' href={team.link2} target='_blank'><i className={team.icon2}></i></a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Team;

