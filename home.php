
<?php require_once("../conexao/conexao.php"); ?>
<?php
    session_start();
?>
<?php
    if(isset($_POST['usuario'])){
        $usuario = $_POST['usuario'];
        $senha = $_POST['senha'];

        $login = "SELECT * ";
        $login .=" FROM clientes ";
        $login .=" WHERE usuario = '{$usuario}' and senha ='{$senha}' ";

        $acesso = mysqli_query($conecta,$login);
        if(!$acesso){
            die('falha no acesso ao banco');
        }

        $info = mysqli_fetch_assoc($acesso);

        if(empty($info)){
            $msg='Usuário ou senha incorretos';
        } else {
            $_SESSION['user_portal'] = $info['clienteID'];
            header("location:homelog.php");
        }
    }
?>
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel='stylesheet' href='css/css1.css'>
    <title>Document</title>
</head>
    <body>
    <div class='container'>
        <nav class='navbar'>
            <ul class="nav justify-content-center">
                <li class="nav-item"><a class="nav-link" href='home.php'>Home</a></li>
                <li class="nav-item"><a class="nav-link" href='produtos.php'>Produtos</a></li>
                <li class="nav-item"><a href='cadastro.php' class="nav-link" href='/'>Cadastre-se</a></li>
            </ul>
            <form action='home.php' method='post' class="form-inline">
                <div class="input-group">
                    <input name='usuario' type="text" class="form-control" placeholder="Usuário">
                    <input name='senha' type="password" class="form-control" placeholder="Senha">
                    <input class="btn btn-sm btn-outline-secondary" type="submit" value='Login'>
                </div> 
            </form>
            <form action='search.php' method='GET'>
                <div class="input-group">
                    <input  class="bsc form-control" type="search" name='produto' placeholder="Busca">
                    <input  class="btn btn-sm btn-outline-secondary" type="submit">
                </div>
            </form>
        </nav>

        <header >
            <img style='margin-left: 15px; margin-top: 15px;' src="../../img/logo3.png">
            <p>Sempre com você!</p>
        </header>
    </div>
    </body>
</html>
<?php
    // Fechar conexao
    mysqli_close($conecta);
?>