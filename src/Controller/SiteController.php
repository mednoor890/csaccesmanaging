<?php

namespace App\Controller;


use App\Entity\Site;
use Doctrine\Persistence\ManagerRegistry;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api')]
class SiteController extends AbstractController
{
    #[Route('/site', name: 'app_site_index', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $em=$doctrine->getManager();
        $sites=$em->getRepository(Site::class)->findAll();
        $data=[];
        foreach ($sites as $site)
        {
            $data[]=
                [    'id'=> $site->getId(),
                    'hostUrl'=>$site->getHostUrl(),
                    'login'=>$site->getLogin(),
                    'password'=>$site->getPassword()
                ];

        }
        return $this->json($data);
    }

    #[Route('/site', name: 'app_site_new', methods: [ 'POST'])]
    public function new(ManagerRegistry $doctrine,Request $request): Response
    {
        $em=$doctrine->getManager();
        $site=new Site();
        $site->setHostUrl($request->request->get('HostUrl'));
        $site->setLogin($request->request->get('login'));
        $site->setPassword($request->request->get('pw'));
        $em->persist($site);
        $em->flush();
        return $this->json('Created new access successfully with id ' . $site->getId());
    }

    #[Route('/site/{id}', name: 'app_site_show', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine,$id): Response
    {
        $site=$doctrine
            ->getRepository(Site::class)
            ->find($id);
        if (!$site){
            return $this->json('no access found for id',$id,404);
        }
        $data=[
            'id'=>$site->getId(),
            'login'=>$site->getLogin(),
            'password'=>$site->getPassword(),
            'HostUrl'=>$site->getHostUrl(),
        ];
        return $this->json($data);
    }

    #[Route('/site/{id}', name: 'app_site_edit', methods: ['PATCH'])]
    public function edit(ManagerRegistry $doctrine,Request $request,  $id): Response
    {
        $em=$doctrine->getManager();
        $site=$em->getRepository(Site::class)->find($id);
        if(!$site){
            return json("no access parameters found with such an id",$id,404);
        }
        $content= json_decode($request->getContent());
        $site->setLogin($content->login);
        $site->setPassword($content->pw);
        $site->setHostUrl($content->HostUrl);

        $em->flush();

        $data=[
            'id'=>$site->getId(),
            'login'=>$site->getLogin(),
            'pw'=>$site->getPassword(),
            'hostUrl'=>$site->getHostUrl(),

        ];
        return $this->json($data);
    }

    #[Route('/site/{id}', name: 'app_site_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine , $id): Response
    {
        $entityManager = $doctrine->getManager();
        $site = $entityManager->getRepository(Site::class)->find($id);

        if (!$site) {
            return $this->json('No access to database found for id' . $id, 404);
        }

        $entityManager->remove($site);
        $entityManager->flush();

        return $this->json('Deleted  Site access parameter successfully with id ' . $id);

    }
}
