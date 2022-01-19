<?php require_once("../conexao/conexao.php"); ?>
<?php
    if(isset($_POST['nome'])){
        $nome = $_POST['nome'];
        $usuario = $_POST['usuario'];
        $senha = $_POST['senha'];

        $inserir =  "INSERT INTO clientes ";
        $inserir .=" (nomecompleto,usuario,senha) ";
        $inserir .=" VALUES ('$nome','$usuario', '$senha') ";

        $operacao_inserir = mysqli_query($conecta, $inserir);
        if(!$operacao_inserir){
            die('erro na inserção');
        }
        header("location:home.php");
    }
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php include_once("topo.php"); ?>
    <form action='cadastro.php' method='post'>
    <input type='text' name='nome' placeholder='Nome'>
    <input type='text' name='usuario' placeholder='Usuário'>
    <input type='text' name='senha' placeholder='Senha'>
    <input type='submit' value='InserT'>

</body>
</html>