import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import PersonIcon from "@mui/icons-material/Person"
import Typography from "@mui/material/Typography"
import { useAuthContext } from "../../hooks/useAuthContext"
import { useState, useEffect } from "react"
import { serverURL } from "../../utils/constants"

export default function StudentProfile({ onUpdateProfileClick }) {
    const { user } = useAuthContext()
    const [form, setForm] = useState({})
    const [change, setChange] = useState({
        cgpa: "",
        cv_link: "",
        per_link: "",
        aoi: "",
    })

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(serverURL + `/student/${user.email}`, {
                headers: { Authorization: `Bearer ${user.token}` },
            })
            const record = await response.json()
            setForm(record)
        }

        if (user) {
            fetchData()
        }
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target
        setChange((prevProps) => ({
            ...prevProps,
            [name]: value,
        }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const id = form._id
        if (change.cgpa === "") {
            change.cgpa = form.cgpa
        }
        if (change.cv_link === "") {
            change.cv_link = form.cv_link
        }
        if (change.per_link === "") {
            change.per_link = form.per_link
        }
        if (change.aoi === "") {
            change.aoi = form.aoi
        }
        const editedStudent = {
            email: form.email,
            password: form.password,
            name: form.name,
            studentID: form.studentID,
            dept: form.dept,
            cgpa: change.cgpa,
            cv_link: change.cv_link,
            per_link: change.per_link,
            aoi: change.aoi,
            notify: 0,
        }

        await fetch(serverURL + `/student/${id}`, {
            method: "PUT",
            body: JSON.stringify(editedStudent),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
            },
        })

        alert("Profile Updated!")
    }

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: "#0e5ec7" }}>
                    <PersonIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Student Profile Update
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="email"
                                name="email"
                                InputLabelProps={{ shrink: true }}
                                label="Your Email"
                                value={form.email}
                                required
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="cgpa"
                                name="cgpa"
                                InputLabelProps={{ shrink: true }}
                                label="CGPA"
                                defaultValue={form.cgpa}
                                onChange={handleInputChange}
                                multiline
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="cv_link"
                                name="cv_link"
                                InputLabelProps={{ shrink: true }}
                                label="CV Link"
                                defaultValue={form.cv_link}
                                onChange={handleInputChange}
                                multiline
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="per_link"
                                name="per_link"
                                InputLabelProps={{ shrink: true }}
                                label="Performance Sheet Link"
                                defaultValue={form.per_link}
                                onChange={handleInputChange}
                                multiline
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                id="aoi"
                                name="aoi"
                                InputLabelProps={{ shrink: true }}
                                label="Areas of Interest"
                                defaultValue={form.aoi}
                                onChange={handleInputChange}
                                multiline
                                required
                            />
                        </Grid>
                    </Grid>
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                        Update Profile
                    </Button>
                </Box>
            </Box>
        </React.Fragment>
    )
}
