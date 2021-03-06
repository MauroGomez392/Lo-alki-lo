const express = require(`express`);
const bodyParser = require(`body-parser`);
const app = express();
let cors = require(`cors`);
let mysql = require("mysql");
const { Console } = require("console");
let connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: null,
    database: "loalkilo"
});
connection.connect(function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log("Conexión correcta");
    }
});
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

function checkRespuesta(err, result) {
    if (err) {
        console.log(err);
    } else {
        console.log(result);
        response.send(result);
    }
};
app.get("/", function (request, response) {
    let respuesta = { error: false, codigo: 200, mensaje: "Home" };
    response.send(respuesta);
});

/*Productos Home*/
app.get("/home", function (request, response) {
    let sql = "SELECT * FROM product "
    connection.query(sql, function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Get de Objetos");
            console.log(result)
            response.send(result)
        };
    });
});
/*Detalle Producto*/
app.get("/anuncio", function (request, response) {
    let id = String(request.query.id);
    let params = new Array(id);
    let sql = "SELECT * FROM product WHERE product_id =  ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err)
        }
        else {
            console.log("Get Objeto Concreto");
            console.log(result)
            response.send(result)
        };
    });
});

/*Checkeado*/

/*Usuario: */
app.get("/users", function (request, response) {
    let id = String(request.query.id);
    let params = new Array(id);
    let sql = "SELECT * FROM user WHERE user_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Get de Usuario");
            console.log(result);
            response.send(result);
        };
    });
});
app.get("/user", function (request, response) {
    let nickname = String(request.query.nickname);
    let params = new Array(nickname);
    let sql = "SELECT * FROM user WHERE nickname = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Get de Nickname de Usuario");
            console.log(result);
            response.send(result);
        };
    });
});
//  nuevo post/register para comprobar nickname antes
// app.post("/users/register", function (request, response) {
//     console.log(request);
//     let params = new Array(String(request.body.name), String(request.body.password), String(request.body.email),
//         String(request.body.direccion), String(request.body.ciudad), String(request.body.cp), String(request.body.foto), String(request.body.nickname), String(request.body.nickname));
//     let sql = "INSERT INTO user (name, password, email, direccion, ciudad , cp, foto, nickname) SELECT * FROM (SELECT ? AS name, ? AS password, ? AS email, ? AS direccion, ? AS ciudad, ? AS cp, ? AS foto, ? AS nickname ) AS tmp WHERE NOT EXISTS (SELECT nickname FROM user WHERE nickname=?) LIMIT 1";
//     connection.query(sql, params, function (err, result) {
//         if (err) {
//             console.log(err);
//         } else {
//             console.log("Nuevo Usuario");
//             console.log(result);
//             response.send(result);
//         };
//     });
// });
app.post("/users/register", function (request, response) {
    console.log(request);
    let params = new Array(String(request.body.nickname), String(request.body.password), String(request.body.foto),String(request.body.email),
         String(request.body.nickname));
let sql = "INSERT INTO user (nickname, password, foto, email) SELECT * FROM (SELECT ? AS nickname, ? AS password, ? AS foto, ? AS email) AS tmp WHERE NOT EXISTS (SELECT nickname FROM user WHERE nickname=?) LIMIT 1";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Nuevo Usuario");
            console.log(result);
            response.send(result);
        };
    });
});
app.post("/users/login", function (request, response) {
    let params = new Array(String(request.body.nickname), String(request.body.password));
    let sql = "SELECT * FROM user WHERE nickname = ? AND password = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Nuevo producto cargado");
            console.log(result);
            response.send(result);
        };
    });
});
app.put("/users", function (request, response) {
    let user_id = String(request.body.user_id);
    let params = new Array(String(request.body.name), String(request.body.password), String(request.body.email),
        String(request.body.direccion), String(request.body.ciudad), String(request.body.cp), String(request.body.foto)
        , String(request.body.nickname), user_id);
    let sql = "UPDATE user SET name = ?, password = ?, email = ?, direccion = ?, ciudad = ?, cp = ?, foto = ?, nickname = ? WHERE user_id = ?"
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Actualización de Usuario");
            console.log(result);
            response.send(result);
        };
    });
});
/*Checkeado*/

/* Buscador por precio*/
app.get("/products/search/precio", function (request, response) {
    let precio = String(request.query.precio);
    let precio2 = String(request.query.precio2);
    let params = [precio, precio2];
    let sql = "SELECT * FROM product WHERE precio BETWEEN ? AND ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de productos de un Usuario");
            console.log(result);
            response.send(result);
        };
    });
});

// Buscador por subcategoría
app.get("/search/productsub", function (request, response) {
    let name2 = String(request.query.subcategoria);
    let params = String (name2);
    let sql = "SELECT * FROM product WHERE subcategoria = ?";  
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de producto por subcategoria");
            console.log(result);
            response.send(result);
        };
    });
});

// Buscador por categoría
app.get("/search/productcat", function (request, response) {
    let name = String(request.query.categoria);
    let params = String (name);
    let sql = "SELECT * FROM product WHERE categoria = ?";  
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de producto por categoria");
            console.log(result);
            response.send(result);
        };
    });
});


/* Buscador barra */
app.post("/search/products", function (request, response) {
    let name = String( '%' + request.body.name + '%');
    let params = new Array(name, name, name, name);
    let sql = "SELECT * FROM product WHERE name LIKE ? OR descripcion LIKE ? OR categoria LIKE ? OR subcategoria LIKE ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de producto por el Buscador");
            console.log(result);
            response.send(result);
        };
    });
});


/*Checkeado */

/*Productos del usuario */
app.get("/products", function (request, response) {
    let id = String(request.query.user_id);
    let params = [id];
    let sql = "SELECT * FROM product WHERE user_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de productos de un Usuario");
            console.log(result);
            response.send(result);
        };
    });
});

app.post("/products", function (request, response) {
    let params = new Array(String(request.body.name), String(request.body.descripcion), String(request.body.user_id),
        String(request.body.foto1), String(request.body.foto2), String(request.body.foto3), String(request.body.foto4),
        String(request.body.nvaloraciones), String(request.body.suma), String(request.body.media), String(request.body.precio),
        String(request.body.categoria), String(request.body.subcategoria));
    let sql = "INSERT INTO product (name, descripcion, user_id, foto1, foto2, foto3, foto4, nvaloraciones, suma, media, precio, categoria, subcategoria) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Nuevo producto cargado");
            console.log(result);
            response.send(result);
        };
    });
});
app.put("/products", function (request, response) {
    let params = new Array(String(request.body.name), String(request.body.descripcion), String(request.body.user_id),
        String(request.body.foto1), String(request.body.foto2), String(request.body.foto3), String(request.body.foto4),
        String(request.body.nvaloraciones), String(request.body.suma), String(request.body.media), String(request.body.precio),
        String(request.body.categoria), String(request.body.subcategoria), String(request.body.product_id));
    let sql = "UPDATE product SET name = ?, descripcion = ?, user_id = ?, foto1 = ?, foto2 = ?, foto3 = ?, foto4 = ?, nvaloraciones = ?, suma = ?, media = ?, precio =?, categoria = ?, subcategoria = ? WHERE product_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Actualización de producto");
            console.log(result);
            response.send(result);
        };
    });
});
app.put("/product", function (request, response) {
    let params = new Array(String(request.body.name), String(request.body.descripcion),
        String(request.body.foto1), String(request.body.foto2), String(request.body.foto3), String(request.body.foto4),
        String(request.body.precio),String(request.body.product_id));
    let sql = "UPDATE product SET name = ?, descripcion = ?, foto1 = ?, foto2 = ?, foto3 = ?, foto4 = ?, precio =? WHERE product_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Actualización de producto");
            console.log(result);
            response.send(result);
        };
    });
});

app.delete("/products", function (request, response) {
    let id = String(request.body.product_id);
    let params = new Array(id);
    let sql = "DELETE FROM product WHERE product_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Se ha eliminado un producto");
            console.log(result);
            response.send(result);
        };
    });
});
app.put("/products/valoraciones", function(request,response) {
    let params = new Array (String (request.body.nvaloraciones), String(request.body.suma), String(request.body.media), String(request.body.product_id));
    let sql = "UPDATE product SET nvaloraciones = ?, suma = ?, media = ? WHERE product_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Actualización valoración de producto");
            console.log(result);
            response.send(result);
        };
    });
})
/*Checkeados */


/*Chat */

app.get("/chat", function (request, response) {
    let emisor = String(request.query.id);
    let params = new Array(emisor, emisor);
    let sql = "SELECT * FROM chat WHERE emisor_id = ? OR receptor_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de chats");
            console.log(result);
            response.send(result);
        };
    });
});
app.put("/products/valoraciones", function(request,response) {
    let params = new Array (String (request.body.nvaloraciones), String(request.body.suma), String(request.body.media), String(request.body.product_id));
    let sql = "UPDATE product SET nvaloraciones = ?, suma = ?, media = ? WHERE product_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Actualización valoración de producto");
            console.log(result);
            response.send(result);
        };
    });
});
app.post("/chat", function(request, response) {
    let params = new Array (String(request.body.emisor_id), String(request.body.receptor_id),
    String(request.body.nickname_emisor), String(request.body.foto_emisor), 
    String(request.body.nickname_receptor), String(request.body.foto_receptor), String(request.body.emisor_id), String(request.body.receptor_id), String(request.body.emisor_id), String(request.body.receptor_id));
    let sql = "INSERT INTO chat (emisor_id, receptor_id, nickname_emisor, foto_emisor, nickname_receptor, foto_receptor) SELECT * FROM (SELECT ? AS emisor_id, ? AS receptor_id, ? AS nickname_emisor, ? AS foto_emisor, ? AS nickname_receptor, ? AS foto_receptor) AS tmp WHERE NOT EXISTS (SELECT emisor_id, receptor_id FROM chat WHERE (emisor_id = ? AND receptor_id = ?) OR (receptor_id = ? AND emisor_id = ?)) LIMIT 1";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Nuevo chat generado");
            console.log(result);
            response.send(result);
        };
    });
});

/*Checkeados y ya en servicio */


/*Mensajes: */

app.get("/mensajes", function (request, response) {
    let id = String(request.query.chat_id);
    let params = new Array(id);
    let sql = "SELECT * FROM mensajes WHERE chat_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de mensajes");
            console.log(result);
            response.send(result);
        };
    });
});

app.get("/mensajes/emisor", function (request, response) {
    let id = String(request.query.id);
    let idE = String(request.query.id2);
    let params = new Array(id, idE);
    let sql = "SELECT * FROM mensajes WHERE chat_id = ? AND user_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de mensajes");
            console.log(result);
            response.send(result);
        };
    });
});


app.get("/mensajes/receptor", function (request, response) {
    let id1 = String(request.query.idChat);
    let id2 = String(request.query.idUser);
    let params = new Array(id1, id2);
    let sql = "SELECT * FROM mensajes WHERE chat_id = ? AND user_id != ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de mensajes");
            console.log(result);
            response.send(result);
        };
    });
})
app.post("/mensajes", function (request, response) {
    let params = new Array(String(request.body.chat_id), String(request.body.user_id), String(request.body.fecha), String(request.body.mensaje));
    let sql = "INSERT INTO mensajes (chat_id, user_id, fecha, mensaje) VALUES (?, ?, ?, ?)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Nuevo mensajes");
            console.log(result);
            response.send(result);
        };
    });
});
/*Checkeado */

/*Favoritos: */
app.get("/favoritos", function (request, response) {
    let id = String(request.query.user_id);
    let params = new Array(id);
    let sql = "SELECT product.name, product.foto1, product.precio, product. descripcion, product.product_id FROM favourites JOIN product ON(product.product_id = favourites.product_id) WHERE favourites.user_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de Favoritos");
            console.log(result);
            response.send(result);
        };
    });
})

app.get("/favorito", function (request, response) {
    let id = String(request.query.user_id);
    let id2 = String(request.query.product_id);
    let params = new Array(id, id2);
    let sql = "SELECT * FROM favourites WHERE favourites.user_id = ? AND favourites.product_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de Favoritos");
            console.log(result);
            response.send(result);
        };
    });
})
app.post("/favoritos", function (request, response) {
    let params = new Array(String(request.body.user_id), String(request.body.product_id));
    let sql = "INSERT INTO favourites (user_id, product_id) VALUES (?, ?)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Nuevo producto como Favorito");
            console.log(result);
            response.send(result);
        };
    });
});

app.delete("/favoritos", function (request, response) {
    let params = new Array(String(request.body.user_id), String(request.body.product_id));
    let sql = "DELETE FROM favourites WHERE user_id = ? AND product_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Se ha eliminado un favorito");
            console.log(result);
            response.send(result);
        };
    });
});
/*Checkeado */

/*Renting: */
/*Productos Alquilados*/
app.get("/products/ad", function (request, response) {
    let user_id = String(request.query.user_id);
    let params = new Array(user_id);
    let sql = "SELECT product.name, product.foto1, product.precio, product.descripcion FROM renting JOIN product ON(renting.product_id = product.product_id) JOIN user ON(user.user_id = renting.arrendatario_id) WHERE (alquilado = true  AND renting.arrendatario_id = user.user_id) ";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Producto alquilado");
            console.log(result);
            response.send(result);
        };
    });
});
/*Peticiones de Alquiler*/
app.get("/products/rent", function (request, response) {
    let user_id = String(request.query.user_id);
    let params = new Array(user_id);
    let sql = "SELECT product.name, product.foto1, product.precio, user.nickname, renting.date, renting.duration,renting.renting_id FROM renting JOIN product ON(renting.product_id = product.product_id) JOIN user ON(user.user_id = renting.arrendatario_id) WHERE (product.user_id = ? AND alquilado = false)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de Renting");
            console.log(result);
            response.send(result);
        };
    });
});
app.get("/products/renting", function(request, response) {
    let arrendatario_id = String(request.query.arrendatarioid);
    let params = new Array(arrendatario_id);
     let sql = "SELECT * FROM product JOIN renting ON (product.product_id = renting.product_id) WHERE (renting.arrendatario_id = ? AND renting.alquilado = true)";
  //   let sql = "SELECT * FROM renting WHERE arrendatario_id = ? AND alquilado = 'true'";
    //let sql = "SELECT product.name, product.foto1, product.precio, user.nickname, renting.date, renting.duration FROM renting JOIN product ON(renting.product_id = product.product_id) JOIN user ON(user.user_id = renting.arrendatario_id) WHERE (user.user_id = ? AND alquilado = false)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de productos Alquilados desde Renting");
            console.log(result);
            response.send(result);
        };
    });
});
app.get("/products/rentingid", function(request, response) {
    let params = new Array(String(request.query.arrendatarioid), String(request.query.product_id));
     let sql = "SELECT renting_id FROM renting WHERE arrendatario_id = ? AND product_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Solicitud de Renting_id con product_id y User_id");
            console.log(result);
            response.send(result);
        };
    });
});
app.post("/products/ad", function (request, response) {
    let params = new Array(String(request.body.duration), String(request.body.date), String(request.body.product_id),
        String(request.body.alquilado), String(request.body.valorado), String(request.body.arrendatario_id));
    let sql = "INSERT INTO renting (duration, date, product_id, alquilado, valorado,arrendatario_id) VALUES (?, ?, ?, ?, ?, ?)";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Nueva solicitud de Alquiler");
            console.log(result);
            response.send(result);
        };
    });
});
/* Cambio en valorado/alquilado anuncio */
app.put("/products/ad", function (request, response) {
    let params = new Array(String(request.body.alquilado), String(request.body.valorado), String(request.body.renting_id));
    let sql = "UPDATE renting SET alquilado = ?, valorado = ? WHERE renting_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Peticion Aceptada");
            console.log(result);
            response.send(result);
        };
    });
});
/*Checkeado*/
/*Borrado de rent*/
app.delete("/products/rent", function (request, response) {
    let id = String(request.body.renting_id);
    let params = new Array(id);
    let sql = "DELETE FROM renting WHERE renting_id = ?";
    connection.query(sql, params, function (err, result) {
        if (err) {
            console.log(err);
        } else {
            console.log("Se ha eliminado una peticion");
            console.log(result);
            response.send(result);
        };
    });
});
/*Funciona*/


app.listen(9191);
