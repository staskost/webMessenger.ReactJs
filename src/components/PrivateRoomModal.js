import React, { Component } from 'react';
import UserContext from '../context/user-context';
import { RadioGroup, RadioButton } from 'react-radio-buttons';

class PrivateRoomModal extends Component {

    static contextType = UserContext;


    constructor(props) {
        super(props);
        this.name = React.createRef();
        this.user = React.createRef();
        this.state = {
            users: [],
            groupUsers: [],
            isPrivate: false
        }
        this.addUser = this.addUser.bind(this);
        this.createPrivate = this.createPrivate.bind(this);
        this.createPublic = this.createPublic.bind(this);
        this.fetchUsers = this.fetchUsers.bind(this);
    }

    onPrvChecked = (e) => {
        this.setState({
            isPrivate: true
        });
    }

    onPublicChecked = (e) => {
        this.setState({
            isPrivate: false
        });
    }

    fetchUsers = () => {
        const url = 'http://localhost:8080/users/users-starts-with/' + this.user.current.value;
        fetch(url, {
            method: 'GET',
            headers: {
                'X-MSG-AUTH': this.context.token,
                'Accept': 'application/json'
            },
        }).then(response => {
            console.log('Response status:', response.status);
            if (response.status === 200) {
                response.json().then(data => {
                    this.setState({
                        users: data
                    });
                    console.log(data);
                })
            } else {
                console.log(response.status);
            }
        }).catch(error => console.error('Error:', error));
    }

    addUser = (groupUser) => {
        this.setState({
            groupUsers: [...this.state.groupUsers, groupUser]
        })
        console.log(this.name.current.value)
        document.getElementById("addUser").value = '';
    }

    createPrivate = (name, groupUsers) => {
        this.props.createPrivate(name, groupUsers);
        this.setState({
            groupUsers: [],
            isPrivate: false
        })
        document.getElementById("name").value = '';
        console.log("yeah")
        console.log(name)
        console.log(groupUsers)
    }

    createPublic = (name) => {
        this.props.createRoom(name)
    }


    // onChange = () =>{
    //     this.setState({
    //         isPrivate: !this.state.isPrivate
    //     })
    // }

    //to be fixed
    render() {
        return (
            <React.Fragment>
                {/* <button type="button" className="btn btn-secondary btn-sm new-room-form button " data-toggle="modal" data-target={"#PrivateRoomModal"}>Create a Room</button> */}
                <a href="#PrivateRoomModal" className="btn btn-dark active new-room-form button col-sm-11 " data-toggle="modal" role="button" aria-pressed="true">Create a new room</a>
                <div className="modal fade" id="PrivateRoomModal" tabIndex="-1" role="dialog" aria-labelledby="addUsers">
                    <div div className="modal-dialog " role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="PrivateRoomModalLabel">Create Room</h5>
                                <button className="close" data-dismiss="modal">&times;</button>
                            </div>
                            <div className="modal-body">
                                {/* <form onSubmit={() =>this.create(this.name.current.value, this.state.groupUsers)}> */}
                                <div className="text-center">
                                    <div >
                                        <label htmlFor='name' className="col-form-label">Name:</label>
                                        <input type="text" className="form-control" id='name' ref={this.name} required ></input>
                                    </div>
                                    <hr></hr>
                                    <div>
                                        {/* <label htmlFor='prv' className="col-form-label">private:</label>
                                        <input type="radio"
                                            id="prv"
                                            onChange={this.onPrvChecked}></input><br></br> */}
                                        <RadioGroup vertical>
                                            <RadioButton onChange={this.onPrvChecked} value="">
                                                Private
                                            </RadioButton>
                                            <RadioButton onChange={this.onPublicChecked} value="">
                                                Public
                                            </RadioButton>
                                            {/* <label htmlFor='public' className="col-form-label"> public:</label>
                                        <input type="radio"
                                            id="public"
                                            onChange={this.onPublicChecked} ></input> */}
                                        </RadioGroup>
                                    </div>
                                    {this.state.isPrivate && <div>
                                        <div >
                                            <label htmlFor='addUsers' className="col-form-label">Add Users</label>
                                            <input list="prv_users" type="addUser" className="form-control" id="addUser" name="addUser"
                                                ref={this.user} onChange={this.fetchUsers} />
                                            <datalist id="prv_users">
                                                {this.state.users.map((user, index) => {
                                                    return <option key={index} value={user.username} />;
                                                })}
                                            </datalist>
                                        </div>
                                        <div>
                                            <button type="button" onClick={() => this.addUser(this.user.current.value)}>Add</button>
                                        </div>
                                    </div>}
                                </div>
                                <div className=" modal-footer justify-content-center">
                                    {/* <button  type="submit" className="btn btn-danger btn-block col-sm-4" data-dismiss="modal" >Submit</button> */}
                                    <button type="button" className="btn btn-dark" onClick={this.state.isPrivate ? () => this.createPrivate(this.name.current.value, this.state.groupUsers)
                                        : () => this.createPublic(this.name.current.value)} data-dismiss="modal" >Create</button>
                                </div>
                                {/* </form> */}
                            </div>

                        </div>
                    </div>
                </div >
            </React.Fragment>
        );
    }
}

export default PrivateRoomModal;