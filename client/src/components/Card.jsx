import React, { useState } from "react";

import { useAuthContext } from '../context/AuthContext'

const Card = ({ id, name, type, imageUrl }) => {
  const { user } = useAuthContext()

  // const role = user?.authorities
  // console.log(role.includes('ROLES_ADMIN'))

  const deleted = async (id) => {
    try {
      // async await
      const response = await fetch(`http://localhost:5000/api/v1/restaurant/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        // alert("Restaurant Deleted successfully!");
        window.location.reload();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const styles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    dialog: {
      background: "white",
      padding: "20px",
      borderRadius: "8px",
      textAlign: "center",
      color: "red"
    },
  };

  const ConfirmDialog = ({ message, onConfirm, onCancel }) => {
    return (
      <div className="z-50" style={styles.overlay}>
        <div style={styles.dialog} className="space-x-4 space-y-2">
          <p>{message}</p>
          <button onClick={onConfirm} className="border px-4 py-2 bg-indigo-500 text-white hover:bg-indigo-700 cursor-pointer">ตกลง</button>
          <button onClick={onCancel} className="border px-4 py-2 bg-red-500 text-white hover:bg-red-700 cursor-pointer">ยกเลิก</button>
        </div>
      </div>
    );
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = () => {
    setShowConfirm(true);
  };

  const confirmDelete = (id) => {
    // console.log(id)
    deleted(id)
    setShowConfirm(false);
    alert("ลบเรียบร้อย!");
  };

  const cancelDelete = () => {
    setShowConfirm(false);
  };

  return (
    <div className="card bg-base-100 w-96 shadow-sm">
      <figure>
        <img src={imageUrl} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
          {name}
          <div className="badge badge-secondary">NEW</div>
        </h2>
        <p>{type}</p>
        <div className="card-actions justify-end">
          {/* <div onClick={() => deleted(id)} className="badge badge-outline">Delete</div> */}
          {
            user && user.authorities.includes('ROLES_ADMIN') &&
            (
            <div>
              <div onClick={handleDelete} className="badge badge-outline">
                Delete
              </div>
              <a
                href={`/update/${id}`}
                className="badge badge-outline cursor-pointer"
              >
                Edit
              </a>
          </div>
          
            )
          }
          {/* USER */}
          {
            user.authorities.includes('ROLES_USER') && <div onClick={handleDelete} className="badge badge-outline">
            Buy
          </div>
          }
          {/* MODERATOR */}
          {
            user.authorities.includes('ROLES_MODERATOR') && <a
            href={`/update/${id}`}
            className="badge badge-outline cursor-pointer"
          >
            Edit
          </a>
          }
          
          {showConfirm && (
            <ConfirmDialog
              message="ต้องการลบหรือไม่"
              onConfirm={() => confirmDelete(id)}
              onCancel={cancelDelete}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
