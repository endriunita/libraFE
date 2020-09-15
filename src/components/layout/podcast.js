import React, { Component } from 'react'

export default class PodcastContainer extends Component{
    constructor(props){
        super(props)
        this.state = {
            podcastTitle: '',
            podcastImg: '',
            podcastUrl: '',
            podcastNotFound: false
        }
    }
    componentDidMount() {
        this.getPodcast()
    }

    getPodcast = () => {
        const rez = this.props.getPref()
        rez.then(result => {
            if (typeof result.response.items.length === 'undefined'){
                this.setState({
                    podcastNotFound: true
                })
                return false
            }
            if (result.response.items.length === 0){
                this.setState({
                    podcastNotFound: true
                })
            }
            else{
                const index = Math.floor(Math.random() * result.response.items.length)
                const title = result.response.items[index].title
                const img = result.response.items[index].image_url
                const link = result.response.items[index].site_url
                this.setState({
                    podcastTitle: title,
                    podcastImg: img,
                    podcastUrl: link,
                    podcastNotFound: false
                })
            }
        })
    }
    
    render() {
        return (
            <div style={pcStyle}>

                {this.state.podcastNotFound === true && 
                    <div style={{color: 'white'}}>
                        You should choose your preferences more wisely
                    </div>
                }

                {this.state.podcastNotFound === false &&
                <div style={{textAlign: 'center',color: 'white'}}>
                    <div style={{background: 'rgba(143,221,60,1', padding: '15px', fontSize: '20px', textShadow: '2px 4px 3px rgba(0,0,0,0.3)'}}>
                        Here's a podcast, it's on us
                    </div>
                    
                    <div>
                        <p style={{fontWeight: 'bold', margin: '10px'}}>
                            {this.state.podcastTitle}
                        </p>
                        
                        <a href={this.state.podcastUrl}>
                            <img alt="podcastimg" style={{height: '200px', width: 'auto', margin: '10px'}} src={this.state.podcastImg}></img>
                        </a>
                    </div>
                    <div>
                        <img alt='spreakerlogo' style={{width: '100%', height: 'auto'}} src="https://i.imgur.com/i8vWh8L.png"></img>
                    </div>
                </div>
                }
            </div>
        );
    }
}

const pcStyle = {
    background: 'rgba(0,0,0,0.5',
    position: 'absolute',
    width: '15vw',
    right: '0',
}