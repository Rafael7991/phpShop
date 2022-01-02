<?php

    //passo 1
    $sevidor = 'localhost';
    $usuario = 'root';
    $senha = 'root1234';
    $banco = 'andes';
    $conecta = mysqli_connect($sevidor,$usuario,$senha,$banco);

    //passo 2
    if(mysqli_connect_errno()){
        die('conexão falhou: '. mysqli_connect_errno());
    }


?>