<?php require_once("../conexao/conexao.php"); ?>
<?php
    setlocale(LC_ALL, 'pt_BR');

    $produtos = "SELECT produtoID, nomeproduto, tempoentrega, precounitario, imagempequena ";
    $produtos .= "FROM produtos ";
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

        $info = mysqli_fetch_assoc($acesso);

        if(empty($info)){
            $msg='Usuário ou senha incorretos';
        } else {
            $_SESSION['user_portal'] = $info['clienteID'];
            header("location:produtoslog.php");
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
                <li class="nav-item"><a class="nav-link" href='home.php'>Home</a></li>
                <li class="nav-item"><a class="nav-link" href='produtos.php'>Produtos</a></li>
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
        <header>
            <img style='margin-left: 15px; margin-top: 15px;' src="../../img/logo3.png">
            <p>Sempre com você!</p>
        </header>
    </div>
    
    <div class='container list'> 
        <?php
            while($linha = mysqli_fetch_assoc($resultado)) {
        ?>
            <ul class='listagem'>
                <div class='grid-item'>    
                    <li class="imagem">
                        <a href="detalhe.php?codigo=<?php echo $linha['produtoID'] ?>">
                            <img src="<?php echo $linha["imagempequena"] ?>">
                        </a>
                    </li>
                    <li><h5><?php echo $linha["nomeproduto"] ?></h5></li>
                    <li>Tempo de Entrega : <?php echo $linha["tempoentrega"] ." dias" ?></li>
                    <li>Preço unitário : <?php echo real_format($linha["precounitario"]) ?></li>
                </div>
            </ul>
        <?php
            }
        ?>           
    </div>
    
</body>
</html>
<?php
    // Fechar conexao
    mysqli_close($conecta);
?>