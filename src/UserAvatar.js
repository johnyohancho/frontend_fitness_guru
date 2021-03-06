import React from 'react'
import ReactDOM from 'react-dom'
import Avatar from 'react-avatar-edit'
import { Modal, Segment, Header } from 'semantic-ui-react';

class UserAvatar extends React.Component {

  constructor(props) {
    super(props)
    const src = './example/einshtein.jpg'
    this.state = {
      preview: null,
      src
    }
    this.onCrop = this.onCrop.bind(this)
    this.onClose = this.onClose.bind(this)
  }
  
  onClose() {
    this.setState({preview: null})
  }
  
  onCrop(preview) {
    this.setState({preview})
  }
  
  render () {
    return (
      <Segment>
        <Header>Avatar</Header>
        <Modal.Content>
          <Avatar
            width={390}
            height={295}
            onCrop={this.onCrop}
            onClose={this.onClose}
            src={this.state.src}
          />
          <img src={this.state.preview} alt="Preview" />
        </Modal.Content>
      </Segment>
    )
  }
}


export default UserAvatar;