import React, { useState } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, InputGroupAddon, InputGroupText, Container, Row, Col, Card, CardBody } from 'reactstrap';
import axios from 'axios';
import { toast } from 'react-toastify';
import toastify from 'react-toastify'
import { useHistory } from 'react-router-dom'
import { it } from 'date-fns/locale';
import { NavLink } from 'react-bootstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';




const PatientReadingForm = (props) => {
    const { appointment_id } = props

    document.title = "Patient's Page"
    const history = useHistory()

    const [glucose, setGlucose] = useState("")
    const [sys, setSys] = useState("")
    const [dia, setDia] = useState("")
    const [tc, setTc] = useState("")
    const [hdl, setHdl] = useState("")
    const [tg, setTg] = useState("")
    const [ldl, setLdl] = useState("")
    const [imageFile, setImageFile] = useState([])
    const [caption, setCaption] = useState([])
    const [zoomLink, setZoomLink] = useState("")   
    // const [previewImage, setPreviewImage] = useState([])



    const handleImages = (e) => {
        // e.target.files is an object with key of [0,1,2,3,4,5] depend on the number of files. and values are object that contain the detail of the file.

        // i need to take all of the values, meaning lo  op through it, and do 2 thing
        // 1)cast the fileobject into imageurl
        // 2)push/append these url into a new empty list
        // 3)After the new empty list is filled. set our previewImage states to be this new empty list.

        const newImageFiles = e.target.files
        setImageFile(newImageFiles)
        let newcaptionArray = Array(newImageFiles.length)
        setCaption([...newcaptionArray])

    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const formData = new FormData()


        // formData.append("image", imageFile)

        for (let i = 0; i < imageFile.length; i++) {
            formData.append("image_files" + i, imageFile[i])
            formData.append("caption" + i, caption[i])
        }
        formData.append("image_count", imageFile.length)

        formData.append("sugar_level", glucose)
        formData.append("systolic_blood_pressure", sys)
        formData.append("diastolic_blood_pressure", dia)
        formData.append("cholestrol_level", tc)
        // formData.append("hdl",hdl)
        // formData.append("tg",tg)
        // formData.append("ldl",ldl)
        formData.append("appointment_id", appointment_id)


        console.log(formData)


        axios({
            method: "POST",
            url: "http://127.0.0.1:5000/api/v1/records/create",
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            data: formData

        })
            .then(result => {
                console.log(result.data)
                toast.success("Reading succesfully submitted")
                setGlucose("")
                setSys("")
                setDia("")
                setTc("")
                setHdl("")
                setTg("")
                setLdl("")
                setImageFile([])
                setCaption([])
                axios.get(`http://127.0.0.1:5000/api/v1/appointments/create_client?appointment_id=${appointment_id}`,
                    {
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(result => {
                        console.log(result.data)
                        setZoomLink(result.data)
                    })
                    .catch(err => {
                        console.log("Error : ", err)
                    })

            
                history.push('/patient')
            })
            .catch (err => {
    console.log("Error : ", err)
})

    }

const handleInput = (e) => {
    if (e.target.name === "glucose") {
        setGlucose(e.target.value)
    }
    if (e.target.name === "sys") {
        setSys(e.target.value)
    }
    if (e.target.name === "dia") {
        setDia(e.target.value)
    }
    if (e.target.name === "tc") {
        setTc(e.target.value)
    }
    if (e.target.name === "hdl") {
        setHdl(e.target.value)
    }
    if (e.target.name === "tg") {
        setTg(e.target.value)
    }
    if (e.target.name === "ldl") {
        setLdl(e.target.value)
    }
}

let captionInput = []
const handleCaptionInput = (e) => {
    console.log(caption)
    const captionInputIdentifier = e.target.name[e.target.name.length - 1]
    console.log(captionInputIdentifier)
    let newCaption = caption.map((cap, index) => {
        if (captionInputIdentifier == index) {
            console.log("hehehe")
            return e.target.value
        } else {
            return cap
        }
    })
    setCaption(newCaption)

};

for (let i = 0; i < imageFile.length; i++) {
    captionInput.push(
        <Card>
            <img width="100%" src={URL.createObjectURL(imageFile[i])} alt="Card image cap" />
            <CardBody>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>Caption</InputGroupText>
                    </InputGroupAddon>
                    <Input type="text" name={"caption" + i} onChange={handleCaptionInput} value={caption[i]} placeholder="Type your caption here" />
                </InputGroup>
            </CardBody>
        </Card>
        
    )
}



return (
    <>


        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label for="Glucose">Glucose</Label>
                <InputGroupAddon addonType="append">

                    <Input onChange={handleInput} name="glucose" type="number" step="0.1" id="glucose_level" placeholder="Enter Blood Glucose Level" />
                    <InputGroupText>mmol/L</InputGroupText>

                </InputGroupAddon>
            </FormGroup>
            <FormGroup>
                <Label for="Blood Pressure">Blood Pressure</Label>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">SYS</InputGroupAddon>
                    <Input onChange={handleInput} value={sys} name="sys" placeholder="Reading" min={0} max={100} type="number" step="1" />

                    <InputGroupAddon addonType="append">mmHg</InputGroupAddon>
                    <InputGroupAddon className="pl-3" addonType="prepend">DIA</InputGroupAddon>
                    <Input onChange={handleInput} value={dia} name="dia" placeholder="Reading" min={0} max={100} type="number" step="1" />

                    <InputGroupAddon addonType="append">mmHg</InputGroupAddon>
                </InputGroup>
            </FormGroup>
            <FormGroup>
                <Label for="Cholesterol">Cholesterol</Label>
                <InputGroup>
                    <InputGroupAddon addonType="prepend">TC</InputGroupAddon>
                    <Input onChange={handleInput} value={tc} name="tc" placeholder="value" min={0} max={100} type="number" step="0.1" />
                    <InputGroupAddon addonType="append">mmol/L</InputGroupAddon>
                    {/* <InputGroupAddon className="pl-3" addonType="prepend">HDL</InputGroupAddon>
                        <Input onChange={handleInput} value={hdl} name="hdl" placeholder="value" min={0} max={100} type="number" step="0.1" />
                        <InputGroupAddon addonType="append">mmol/L</InputGroupAddon>
                        <InputGroupAddon className="pl-3" addonType="prepend">TG</InputGroupAddon>
                        <Input onChange={handleInput} value={tg} name="tg" placeholder="value" min={0} max={100} type="number" step="0.1" />
                        <InputGroupAddon addonType="append">mmol/L</InputGroupAddon>
                        <InputGroupAddon className="pl-3" addonType="prepend">LDL</InputGroupAddon>
                        <Input onChange={handleInput} value={ldl} name="ldl" placeholder="value" min={0} max={100} type="number" step="0.1" />
                        <InputGroupAddon addonType="append">mmol/L</InputGroupAddon> */}
                </InputGroup>
            </FormGroup>

            <FormGroup>
                <Label for="exampleFile">File</Label>
                <Input onChange={handleImages} type="file" accept="image/*" multiple name="file" id="exampleFile" />
                <FormText color="muted">
                    Upload Image if neccessary.
                    </FormText>
            </FormGroup>
            {captionInput}
            <br />
            
            <Input type="submit" className="btn btn-primary btn-block" value="SUBMIT" />{' '}
        </Form>
        <br/>
        {
         zoomLink==""  ? <p>Your video link will appear here after your submission.</p>: <a href={zoomLink} target="_blank" style={{textAlign:"center"}}>Enter Appointment</a>
        }
        

    </>
)
}


export default PatientReadingForm