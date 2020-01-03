import React from 'react';
import { Link } from 'react-router-dom';
import { css } from 'glamor';
import { userService } from '../_services';
import  {Form} from '../NoteKeeping';
import  {Notes} from '../NoteKeeping';
class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            notes: [],
            filter: 'none',
            user: {},
            users: []
        };
    }
    createNote = async note => {
        const notes = [note, ...this.state.notes]
        this.setState({ notes })
      }
      
      updateNote =async note => {
        const updatedNote = {
          ...note,
          status: note.status === 'new' ? 'completed' : 'new'
        }
        const index = this.state.notes.findIndex(i => i.name === note.name)
        const notes = [...this.state.notes]
        notes[index] = updatedNote
        this.setState({ notes })
      }
      
      deleteNote =async note => {
        const notes = this.state.notes.filter(n => n.name !== note.name)
        this.setState({ notes })
      }
      
    updateFilter = filter => this.setState({ filter })
    componentDidMount() {
        this.setState({ 
            user: JSON.parse(localStorage.getItem('user')),
            users: { loading: true }
        });
        
        userService.getAll().then(users => this.setState({ users }));
    }
    

    render() {
        const { user, users } = this.state;
        let { notes, filter } = this.state
        if (filter === 'completed') {
          notes = notes.filter(n => n.status === 'completed')
        }
        if (filter === 'new') {
          notes = notes.filter(n => n.status === 'new')
        }
        return (
      <div className="col-md-6 col-md-offset-3">
          <div {...css(styles.container)}>
            <p {...css(styles.title)}>Notes</p>
            <Form
              createNote={this.createNote}
            />
            <Notes
              notes={notes}
              deleteNote={this.deleteNote}
              updateNote={this.updateNote}
            />
             <div {...css(styles.bottomMenu)}>
              <p
                onClick={() => this.updateFilter('none')}
                {...css([ styles.menuItem, getStyle('none', filter)])}
              >All</p>
              <p
                onClick={() => this.updateFilter('completed')}
                {...css([styles.menuItem, getStyle('completed', filter)])}
              >Completed</p>
              <p
                onClick={() => this.updateFilter('new')}
                {...css([styles.menuItem, getStyle('new', filter)])}
              >Pending</p>
             </div> 
             <div {...css(styles.bottomMenu)}></div>
                 <p>
                   <Link to="/login">Logout</Link>
                 </p>
          </div> 
          </div>
        );
        // return (
        //     <div className="col-md-6 col-md-offset-3">
        //         <h1>Hi {user.firstName}!</h1>
        //         <p>You're logged in with React & Basic HTTP Authentication!!</p>
        //         <h3>Users from secure api end point:</h3>
                
        //         <p>
        //             <Link to="/login">Logout</Link>
        //         </p>
        //     </div>
        // );
   
    }
    
}
function getStyle(type, filter) {
    if (type === filter) {
      return {
        fontWeight: 'bold'
      }
    }
  }
  const styles = {
    bottomMenu: {
      display: 'flex',
      marginTop: 10,
      justifyContent: 'center'
    },
    menuItem: {
      cursor: 'pointer',
      marginRight: 20
    },
    title: {
      fontSize: 44,
      margin: '10px 0px'
    },
    container: {
      textAlign: 'center'
    }
  } 

export { HomePage };