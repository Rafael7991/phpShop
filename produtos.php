<?php require_once("../conexao/conexaoshop.php"); ?>
<?php
    session_start();
?>
<?php
    setlocale(LC_ALL, 'pt_BR');

    $produtos = "SELECT produtoID, nomeproduto, modelo, precovenda, imagem ";
    $produtos .= " FROM produtos ";
    if(isset($_GET['produto'])){
        $nome_produto = $_GET['produto'];
        $produtos .= "WHERE nomeproduto LIKE '%{$nome_produto}%'";
    }
    $resultado = mysqli_query($conecta, $produtos);
    if(!$resultado) {
        die("Falha na consulta ao banco");   
    }
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

        
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel='stylesheet' href='css/css1.css'>
    <link rel='stylesheet' href='css/css2.css'>
    <link rel='stylesheet' href='css/css3.css'>
    <title>Document</title>
</head>
<body>
    <?php include_once("funcoes.php"); ?>
    <div class='container'>
        <nav class='navbar'>
            <ul class="nav justify-content-center">
                <li style='margin-top:5px' class="nav-item"><a class="nav-link" href='home.php'>Home</a></li>
                <li style='margin-top:5px' class="nav-item"><a class="nav-link" href='produtos.php'>Produtos</a></li>
                <li class="nav-item">
                    <?php
                    if(isset($_SESSION['user_portal'])){
                    $user = $_SESSION['user_portal'];

                    $saudacao = "SELECT nome ";
                    $saudacao .= "FROM clientes ";
                    $saudacao .= "WHERE clienteID = $user ";

                    $saudacao_login = mysqli_query($conecta,$saudacao);
                    if(!$saudacao_login){
                        die("falha no banco");
                    }
                   
                    $saudacao_login = mysqli_fetch_assoc($saudacao_login);
                    $nome = $saudacao_login['nome'];
                    ?>
                    <div style='margin-top:3px' id='header_saudacao'><h6>Bem-vindo(a), <?php echo $nome ?> - <a href='sair.php'>Sair</a></h6> </div>
                    <li style='margin-left:30px;' class="nav-item"><a href='const.php' class="nav-link" href='/'>Cadastre sua empresa</a></li>
                    <?php
                    } else {
                        ?>
                            <li style='margin-top:5px' class="nav-item"><a href='inserir.php' class="nav-link" href='/'>Cadastre-se</a></li>
                            <form action='home.php' method='post' class="form-inline">
                                <div class="input-group">
                                    <input name='usuario' type="text" class="form-control" placeholder="Usuário">
                                    <input name='senha' type="password" class="form-control" placeholder="Senha">
                                    <input class="btn btn-sm btn-outline-secondary" type="submit" value='Login'>
                                </div> 
                            </form>
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
    
    <div class='container list'>
        <?php

            
        ?>
        <?php
            $marca1 = "SELECT nomeproduto, nome FROM produtos, fab ";
            $marca1 .=" WHERE produtos.fabricanteID = fab.fabricanteID";
            $marca2 = mysqli_query($conecta, $marca1);
            while($linha = mysqli_fetch_assoc($resultado) ) {
                $marca = mysqli_fetch_assoc($marca2);
        ?>
            <ul class='listagem'>
                <div class='grid-item'>    
                    <li class="imagem">
                        <a href="detalhe.php?codigo=<?php echo $linha['produtoID'] ?>">
                            <img src="<?php echo $linha["imagem"] ?>">
                        </a>
                    </li>
                    <li><?php echo $linha['nomeproduto'] ?></li>
                    <li><h5><?php echo $linha["modelo"] ?></h5></li>
                    <li><?php echo $marca['nome'] ?></li>
                    <li><?php echo real_format($linha["precovenda"]) ?></li>
                </div>
            </ul>
        <?php
            }
        ?>           
    </div>
    <?php include_once("rodape.html"); ?>
</body>
</html>
<?php
    // Fechar conexao
    mysqli_close($conecta);
?>