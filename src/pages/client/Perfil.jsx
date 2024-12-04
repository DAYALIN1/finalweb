import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faLock } from '@fortawesome/free-solid-svg-icons';
import '../../assets/styles/Pedidos.scss';
import Pedidos from './Pedidos';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile } from '../../services/client/profileService';
import userImage from '../../assets/images/user.png';


const Perfil = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [newName, setNewName] = useState('');
    const [newEmail, setNewEmail] = useState('');
    const [errors, setErrors] = useState({ name: '', email: '' });

    const [showPasswordModal, setShowPasswordModal] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordSuccess, setPasswordSuccess] = useState('');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profileData = await getProfile();
                setName(profileData.name || '');
                setEmail(profileData.email || '');
                setNewName(profileData.name || '');
                setNewEmail(profileData.email || '');
            } catch (err) {
                console.error('Error al cargar el perfil:', err);
            }
        };

        fetchProfile();
    }, []);

    const handleEditClick = () => {
        setEditMode(true);
    };

    const handleAcceptChanges = async () => {
        let valid = true;
        const newErrors = { name: '', email: '' };

        if ((newName || '').trim() === '') {
            newErrors.name = 'El nombre no puede estar en blanco.';
            valid = false;
        }

        if ((newEmail || '').trim() === '' || !/\S+@\S+\.\S+/.test(newEmail)) {
            newErrors.email = 'El correo debe ser válido.';
            valid = false;
        }

        setErrors(newErrors);

        if (valid) {
            try {
                await updateProfile({ name: newName, email: newEmail });
                setName(newName);
                setEmail(newEmail);
                setEditMode(false);
            } catch (error) {
                console.error('Error al actualizar el perfil:', error.message);
                setErrors({ ...newErrors, global: 'Error al actualizar el perfil.' });
            }
        }
    };

    const handleViewCart = () => {
        navigate('/cart');
    };

    return (
        <div className="perfil">
            <div className="perfil-info">
                <img
                    src={userImage}
                    alt="Foto de perfil"
                    className="perfil-foto"
                />
                <div className="perfil-detalles">
                    {editMode ? (
                        <>
                            <div>
                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) => setNewName(e.target.value)}
                                    className="input-edit"
                                />
                                {errors.name && <p className="error">{errors.name}</p>}
                            </div>
                            <div>
                                <input
                                    type="text"
                                    value={newEmail}
                                    onChange={(e) => setNewEmail(e.target.value)}
                                    className="input-edit"
                                />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>
                        </>
                    ) : (
                        <>
                            <h1>{name}</h1>
                            <p>{email}</p>
                        </>
                    )}
                </div>
            </div>
            <div className="perfil-acciones">
                {!editMode ? (
                    <button className="btn-editar" onClick={handleEditClick}>
                        Editar perfil <FontAwesomeIcon icon={faPen} />
                    </button>
                ) : (
                    <button className="btn-aceptar" onClick={handleAcceptChanges}>
                        Aceptar cambios
                    </button>
                )}
            </div>

            <div className="pedidos">
                <h1>Pedidos</h1>
            </div>
            <Pedidos />
        </div>
    );
};

export default Perfil;
