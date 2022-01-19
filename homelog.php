
<?php require_once("../conexao/conexao.php"); ?>
<?php
    session_start();
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
<body >
    <div class='container'>
        <nav class='navbar'>
            <ul class="nav justify-content-center">
                <li class="nav-item"><a class="nav-link" href='home.php'>Home</a></li>
                <li class="nav-item"><a class="nav-link" href='produtoslog.php'>Produtos</a></li>
                <li class="nav-item">
                    <?php
                    if(isset($_SESSION['user_portal'])){
                    $user = $_SESSION['user_portal'];

                    $saudacao = "SELECT nomecompleto ";
                    $saudacao .= "FROM clientes ";
                    $saudacao .= "WHERE clienteID = $user ";

                    $saudacao_login = mysqli_query($conecta,$saudacao);
                    if(!$saudacao_login){
                        die("falha no banco");
                    } 
                    $saudacao_login = mysqli_fetch_assoc($saudacao_login);
                    $nome = $saudacao_login['nomecompleto'];
                    ?>
                    <div id='header_saudacao'><h6>Bem-vindo(a), <?php echo $nome ?> - <a href='sair.php'>Sair</a></h6> </div> 
                    <?php
                    }
                    ?>
                </li>
            </ul>
            <form action='search.php' method='GET'>
                <div class="input-group">
                    <input  class="bsc form-control" type="search" name='produto' placeholder="Busca">
                    <input  class="btn btn-sm btn-outline-secondary" type="submit">
                </div>
            </form>
        </nav>
        <header>
            <img style='margin-left: 15px; margin-top: 15px;' src="../../img/logo3.png">
            <p>Sempre com você!</p>
        </header>
    </div>

    <script src="../bs_js/jquery.js"></script>
    <script src="../bs_js/bootstrap.min.js"></script>
    <script src="_js/script.js"></script>
</body>
</html>
<?php
    // Fechar conexao
    mysqli_close($conecta);
?>